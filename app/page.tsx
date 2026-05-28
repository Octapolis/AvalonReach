import { SearchForm } from "@/components/search-form";

export default function HomePage() {
  return (
    <main>
      <section className="hero hero-simple">
        <div className="hero-copy">
          <p className="eyebrow">Broadband comparison for real addresses</p>
          <h1>Find the best internet available where you actually live.</h1>
          <p className="hero-text">
            Enter an address, compare available providers, and get a clear recommendation based on speed, price, upload needs, and how you use the internet.
          </p>
          <SearchForm />
        </div>
      </section>

      <section className="section" id="how-it-works">
        <h2>How it works</h2>
        <div className="steps steps-minimal">
          <article><span>1</span><h3>Search your address</h3><p>Check broadband availability for a real location.</p></article>
          <article><span>2</span><h3>Choose priorities</h3><p>Compare speed, price, upload, and connection fit.</p></article>
          <article><span>3</span><h3>Get a clear pick</h3><p>See the recommended option and why it ranks first.</p></article>
        </div>
      </section>
    </main>
  );
}
