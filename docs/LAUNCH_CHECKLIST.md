# V1 Launch Checklist

## Before domain activation

- [ ] Create Supabase project
- [ ] Run `supabase/migrations/001_initial_schema.sql`
- [ ] Add environment variables to Vercel
- [ ] Confirm `BROADBAND_PROVIDER=live`
- [ ] Test address lookup with 5+ real addresses
- [ ] Test lead capture stores email/consent
- [ ] Replace starter privacy/terms with reviewed copy
- [ ] Add provider/referral links for the first target providers

## Domain activation

- [ ] Register domain
- [ ] Add domain to Vercel project
- [ ] Configure DNS records
- [ ] Update `NEXT_PUBLIC_SITE_URL`
- [ ] Re-test search, leads, privacy, terms, and provider handoff pages

## V1 success criteria

A real user can enter an address, get provider availability results, understand that exact pricing must be confirmed, and leave an email for updates/help.
