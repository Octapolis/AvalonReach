"use client";

import Link from "next/link";
import { useState } from "react";

type RecentSearch = {
  address: string;
  priority: string;
  searchedAt: string;
};

export function RecentSearches() {
  const [searches] = useState<RecentSearch[]>(readRecentSearches);

  if (searches.length === 0) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

  return (
    <section className="recent-searches" aria-label="Recent searches on this device">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Temporary history</p>
          <h2>Recent searches on this device</h2>
        </div>
        <Link className="button ghost compact" href="/">Search again</Link>
      </div>
      <div className="saved-search-list">
        {searches.map((search) => (
          <article className="saved-search-card" key={`${search.address}-${search.priority}-${search.searchedAt}`}>
            <div>
              <h2>{search.address}</h2>
              <p>{search.priority.replace("-", " ")} priority</p>
            </div>
            <div className="saved-search-meta">
              <span>Temporary cache</span>
              <span>{formatter.format(new Date(search.searchedAt))}</span>
            </div>
            <Link className="button ghost compact" href={`/results?address=${encodeURIComponent(search.address)}&priority=${encodeURIComponent(search.priority)}`}>
              Reopen
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function readRecentSearches() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem("avalonreach:recent-searches");
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed)
      ? parsed
        .filter(isRecentSearch)
        .slice(0, 5)
      : [];
  } catch {
    return [];
  }
}

function isRecentSearch(input: unknown): input is RecentSearch {
  if (!input || typeof input !== "object") return false;

  const candidate = input as Partial<RecentSearch>;
  return (
    typeof candidate.address === "string" &&
    typeof candidate.priority === "string" &&
    typeof candidate.searchedAt === "string"
  );
}
