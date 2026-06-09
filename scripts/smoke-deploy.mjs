const DEFAULT_BASE_URL = "https://avalon-reach.vercel.app";
const DEFAULT_ADDRESS = "1400 John F Kennedy Blvd, Philadelphia, PA 19107";

const baseUrl = normalizeBaseUrl(process.argv[2] || process.env.BASE_URL || DEFAULT_BASE_URL);
const address = process.env.SMOKE_ADDRESS || DEFAULT_ADDRESS;
const failures = [];

await checkHttp("homepage", `${baseUrl}/`, 200);
await checkHttp("results page", `${baseUrl}/results?${new URLSearchParams({ address, priority: "best-value" })}`, 200);
await checkHttp("provider handoff", `${baseUrl}/go/verizon`, 200);
await checkHttp("privacy", `${baseUrl}/privacy`, 200);
await checkHttp("terms", `${baseUrl}/terms`, 200);
await checkHttp("GET /api/search", `${baseUrl}/api/search`, 405);

const bestValue = await postSearch("best-value");
const cheapest = await postSearch("cheapest");
const fastest = await postSearch("fastest");

check(Boolean(bestValue?.providers?.length), "best-value returns providers");
check(Boolean(cheapest?.providers?.length), "cheapest returns providers");
check(Boolean(fastest?.providers?.length), "fastest returns providers");

const bestFirst = bestValue?.providers?.[0] ?? {};
const cheapestFirst = cheapest?.providers?.[0] ?? {};
const fastestFirst = fastest?.providers?.[0] ?? {};

check(bestFirst.scoreLabel === "Price unavailable", "best-value exposes missing price score label");
check(bestFirst.priceLabel === "Listed price: unavailable - confirm with provider", "best-value exposes explicit price label");
check(!String(bestFirst.recommendationReason ?? "").includes("0.0 Mbps per dollar"), "best-value avoids fake zero value copy");

check(cheapestFirst.scoreLabel === "Price unavailable", "cheapest exposes missing price score label");
check(cheapestFirst.priceLabel === "Listed price: unavailable - confirm with provider", "cheapest exposes explicit price label");
check(String(cheapestFirst.recommendationReason ?? "").includes("cannot be confirmed as the cheapest"), "cheapest explains missing price limitation");

check(typeof fastestFirst.scoreLabel === "string" && fastestFirst.scoreLabel.includes("Mbps down"), "fastest keeps speed score label");

const resultsHtml = await textFetch(`${baseUrl}/results?${new URLSearchParams({ address, priority: "best-value" })}`);
check(resultsHtml.includes("Listed price: unavailable - confirm with provider"), "results page shows explicit unavailable price line");
check(resultsHtml.includes("Xfinity Cable / DOCSIS"), "results page distinguishes Xfinity cable");
check(resultsHtml.includes("Xfinity Fiber / FTTP"), "results page distinguishes Xfinity fiber");
check(!resultsHtml.includes("0.0 Mbps per dollar"), "results page avoids fake Mbps-per-dollar copy");
check(!resultsHtml.includes("Score 0"), "results page avoids raw zero score");

const handoffHtml = await textFetch(`${baseUrl}/go/verizon`);
check(handoffHtml.includes("not a paid referral link yet"), "handoff explains referral link is not live");
check(handoffHtml.includes("confirm availability, monthly price, promos"), "handoff tells user to confirm provider details");
check(handoffHtml.includes("Search another address"), "handoff includes search fallback action");

if (failures.length > 0) {
  console.error(`\nSmoke test failed for ${baseUrl}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Smoke test passed for ${baseUrl}`);

async function postSearch(priority) {
  const response = await fetch(`${baseUrl}/api/search`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ address, priority })
  });

  check(response.status === 200, `POST /api/search ${priority} returns 200`);
  if (!response.ok) return null;
  return response.json();
}

async function checkHttp(label, url, expectedStatus) {
  const response = await fetch(url);
  check(response.status === expectedStatus, `${label} returns ${expectedStatus} (got ${response.status})`);
}

async function textFetch(url) {
  const response = await fetch(url);
  check(response.ok, `${url} returns OK`);
  return response.text();
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function normalizeBaseUrl(input) {
  return input.replace(/\/+$/, "");
}
