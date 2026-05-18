import type { Metadata } from "next";
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
            <a className="brand" href="/">AvalonReach</a>
            <nav>
              <a href="/#how-it-works">How it works</a>
              <a href="/#lead-capture">Updates</a>
              <a href="/dashboard">Dashboard</a>
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
