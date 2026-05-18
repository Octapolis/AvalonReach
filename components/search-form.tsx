"use client";

import { useState } from "react";

export function SearchForm() {
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState("best-value");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ address, priority });
    window.location.href = `/results?${params.toString()}`;
  }

  return (
    <form className="search-card" onSubmit={onSubmit}>
      <input
        aria-label="Street address"
        placeholder="Enter your address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        required
      />
      <select aria-label="Priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option value="best-value">Best overall</option>
        <option value="fastest">Fastest speed</option>
        <option value="cheapest">Cheapest</option>
        <option value="upload">Best upload</option>
        <option value="gaming">Gaming / low-lag</option>
      </select>
      <button type="submit">Find my internet</button>
    </form>
  );
}
