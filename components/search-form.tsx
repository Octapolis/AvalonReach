"use client";

import { useEffect, useId, useRef, useState } from "react";

type AddressSuggestion = {
  label: string;
  city?: string;
  state?: string;
  zip?: string;
};

export function SearchForm() {
  const listId = useId();
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState("fastest");
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "error">("idle");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [suggestionStatus, setSuggestionStatus] = useState<"idle" | "loading" | "matched">("idle");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmed = address.trim();
    abortRef.current?.abort();

    if (trimmed.length < 8 || !trimmed.includes(" ")) {
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    const timer = window.setTimeout(async () => {
      setSuggestionStatus("loading");

      try {
        const response = await fetch(`/api/address-suggestions?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal
        });
        const payload = await response.json() as { suggestions?: AddressSuggestion[] };
        const nextSuggestions = Array.isArray(payload.suggestions) ? payload.suggestions : [];
        setSuggestions(nextSuggestions);
        setSuggestionStatus(nextSuggestions.length > 0 ? "matched" : "idle");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSuggestions([]);
          setSuggestionStatus("idle");
        }
      }
    }, 450);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [address]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    rememberSearch(address, priority);
    const params = new URLSearchParams({ address, priority });
    window.location.href = `/results?${params.toString()}`;
  }

  function updateAddress(nextAddress: string) {
    setAddress(nextAddress);

    const trimmed = nextAddress.trim();
    if (trimmed.length < 8 || !trimmed.includes(" ")) {
      setSuggestions([]);
      setSuggestionStatus("idle");
    }
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        rememberSearch("Current location", priority);
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
      <div className="address-field">
        <input
          aria-label="Street address"
          aria-describedby={`${listId}-hint`}
          placeholder="Enter your address"
          value={address}
          onChange={(event) => updateAddress(event.target.value)}
          list={listId}
          autoComplete="street-address"
          required
        />
        <datalist id={listId}>
          {suggestions.map((suggestion) => (
            <option value={suggestion.label} key={suggestion.label} />
          ))}
        </datalist>
        <p className="address-hint" id={`${listId}-hint`}>
          {suggestionStatus === "loading"
            ? "Checking likely address matches..."
            : suggestionStatus === "matched"
              ? "Choose a suggested match to use the verified address format."
              : "Tip: include city and state for address verification."}
        </p>
      </div>
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

function rememberSearch(address: string, priority: string) {
  if (typeof window === "undefined") return;

  const trimmedAddress = address.trim();
  if (!trimmedAddress) return;

  const nextSearch = {
    address: trimmedAddress,
    priority,
    searchedAt: new Date().toISOString()
  };

  try {
    const stored = window.localStorage.getItem("avalonreach:recent-searches");
    const previous = stored ? JSON.parse(stored) : [];
    const searches = Array.isArray(previous) ? previous : [];
    const deduped = searches.filter((search) => search?.address !== trimmedAddress || search?.priority !== priority);

    window.localStorage.setItem(
      "avalonreach:recent-searches",
      JSON.stringify([nextSearch, ...deduped].slice(0, 5))
    );
  } catch {
    // Recent searches are convenience-only; a storage failure should not block lookup.
  }
}
