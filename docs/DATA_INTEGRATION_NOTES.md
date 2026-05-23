# Data Integration Notes

## Address lookup flow

1. User submits address.
2. Geocoder converts address to latitude/longitude.
3. Broadband availability API receives coordinates.
4. API response is normalized into `ProviderPlan[]`.
5. Recommendation engine ranks providers.

## Candidate APIs/data sources

- FCC National Broadband Map / BDC public data
- Broadband Map API-style coordinate lookup
- Provider affiliate feeds/manual links for monetization

## Important caveat

Availability APIs may identify providers and max advertised speeds, but exact prices/promos often require provider-specific pages or affiliate feeds. The MVP should separate:

- Availability confidence
- Speed/technology data
- Estimated price/manual price
- Referral/action link
