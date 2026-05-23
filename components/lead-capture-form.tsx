"use client";

import { useState } from "react";

export function LeadCaptureForm({ defaultLocation = "" }: { defaultLocation?: string }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries()))
    });
    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Email address" required />
      <input name="zip" placeholder="ZIP code, city, or searched address" defaultValue={defaultLocation} />
      <select name="intent" defaultValue="results">
        <option value="results">Send me my results</option>
        <option value="better-deals">Notify me about better deals</option>
        <option value="setup-help">Help me pick a plan</option>
      </select>
      <label className="checkbox-row">
        <input name="consent" type="checkbox" value="yes" required />
        I agree to receive email updates about internet options.
      </label>
      <button type="submit" disabled={status === "saving"}>{status === "saving" ? "Saving..." : "Join updates"}</button>
      {status === "saved" && <p className="form-success">Saved. You are on the list.</p>}
      {status === "error" && <p className="form-error">Something went wrong. Try again.</p>}
    </form>
  );
}
