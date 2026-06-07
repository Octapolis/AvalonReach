import type { Metadata } from "next";
import Link from "next/link";
import "./styles.css";

export const metadata: Metadata = {
  title: "AvalonReach | Find the best internet at your address",
  description: "Compare internet options by address and get a plain-English recommendation for speed, price, and fit."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="site-header">
            <Link className="brand" href="/">AvalonReach</Link>
            <nav>
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/dashboard">Results</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <span>© AvalonReach</span>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
