"use client";

import { useState } from "react";

export function SearchForm() {
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState("fastest");
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "error">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ address, priority });
    window.location.href = `/results?${params.toString()}`;
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const params = new URLSearchParams({
          address: "Current location",
          lat: String(position.coords.latitude),
          lng: String(position.coords.longitude),
          priority
        });
        window.location.href = `/results?${params.toString()}`;
      },
      () => setLocationStatus("error"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  return (
    <form className="search-card search-card-expanded" onSubmit={onSubmit}>
      <input
        aria-label="Street address"
        placeholder="Enter your address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        required
      />
      <select className="priority-select" aria-label="Priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option value="fastest">Fastest</option>
        <option value="best-value">Best overall</option>
        <option value="cheapest">Cheapest</option>
        <option value="upload">Upload</option>
        <option value="gaming">Gaming</option>
      </select>
      <button type="submit">Find my internet</button>
      <button className="button ghost compact" type="button" onClick={useCurrentLocation} disabled={locationStatus === "loading"}>
        {locationStatus === "loading" ? "Locating..." : "Use my location"}
      </button>
      {locationStatus === "error" && <p className="form-error search-error">Location access did not work. Enter an address instead.</p>}
    </form>
  );
}
