-- AvalonReach starter provider/plan catalog.
-- Safe to rerun. Uses sample provider data for MVP demos until real provider data is loaded.

insert into public.providers (slug, name, website_url, support_notes, active)
values
  ('fiberfast', 'FiberFast', null, 'Sample fiber provider for MVP demos.', true),
  ('cablewave', 'CableWave', null, 'Sample cable provider for MVP demos.', true),
  ('airtower', 'AirTower Home', null, 'Sample 5G home internet provider for MVP demos.', true),
  ('ruralbeam', 'RuralBeam', null, 'Sample fixed wireless provider for MVP demos.', true),
  ('budgetnet', 'BudgetNet', null, 'Sample DSL provider for MVP demos.', true),
  ('starlink-sample', 'Starlink Sample', null, 'Sample LEO satellite provider for MVP demos.', true),
  ('skyreach', 'SkyReach Satellite', null, 'Sample traditional satellite provider for MVP demos.', true)
on conflict (slug) do update set
  name = excluded.name,
  website_url = excluded.website_url,
  support_notes = excluded.support_notes,
  active = excluded.active;

insert into public.plans (
  provider_id,
  slug,
  name,
  technology,
  transport_type,
  max_download_mbps,
  max_upload_mbps,
  estimated_monthly_price,
  estimated_latency_ms,
  contract_required,
  referral_url,
  availability_notes,
  source,
  active
)
values
  ((select id from public.providers where slug = 'fiberfast'), 'fallback-fiberfast-1g', 'FiberFast Gigabit', 'Fiber / FTTP', 'fiber', 1000, 1000, 75, 8, false, '#', 'Best all-around fallback plan for speed, upload, latency, and reliability. Availability: 19103, 19104, sample metro fiber areas.', 'sample', true),
  ((select id from public.providers where slug = 'fiberfast'), 'fallback-fiberfast-500', 'FiberFast 500', 'Fiber / FTTP', 'fiber', 500, 500, 55, 9, false, '#', 'Strong value fiber option with symmetrical upload and download speeds. Availability: 19103, 19104, sample metro fiber areas.', 'sample', true),
  ((select id from public.providers where slug = 'cablewave'), 'fallback-cablewave-800', 'CableWave Ultra 800', 'Cable / DOCSIS', 'cable', 800, 35, 55, 22, false, '#', 'Strong download speed, but upload is much lower than fiber. Availability: 19103, 19104, 19019, sample suburban cable areas.', 'sample', true),
  ((select id from public.providers where slug = 'cablewave'), 'fallback-cablewave-300', 'CableWave Starter 300', 'Cable / DOCSIS', 'cable', 300, 20, 40, 25, false, '#', 'Lower-cost cable option for basic streaming and browsing. Availability: 19103, 19104, 19019, sample suburban cable areas.', 'sample', true),
  ((select id from public.providers where slug = 'airtower'), 'fallback-airtower-5g', 'AirTower 5G Plus', '5G Home Internet', '5g-home', 300, 30, 50, 35, false, '#', 'Can be fast, but performance depends on signal strength and congestion. Availability: 19019 and sample 5G coverage areas.', 'sample', true),
  ((select id from public.providers where slug = 'airtower'), 'fallback-airtower-5g-basic', 'AirTower 5G Basic', '5G Home Internet', '5g-home', 150, 20, 35, 45, false, '#', 'Budget 5G home internet option; check indoor signal before relying on it for work calls. Availability: 19019 and sample 5G coverage areas.', 'sample', true),
  ((select id from public.providers where slug = 'ruralbeam'), 'fallback-ruralbeam-150', 'RuralBeam Fixed 150', 'Fixed Wireless', 'fixed-wireless', 150, 25, 60, 40, false, '#', 'Useful where wired service is limited; signal line-of-sight can matter. Availability: Sample rural service areas.', 'sample', true),
  ((select id from public.providers where slug = 'budgetnet'), 'fallback-budgetnet-dsl', 'BudgetNet DSL 100', 'DSL', 'dsl', 100, 20, 35, 55, true, '#', 'Low monthly price, but slower than fiber, cable, and many wireless options. Availability: Sample legacy wireline areas.', 'sample', true),
  ((select id from public.providers where slug = 'starlink-sample'), 'fallback-starlink-residential', 'LEO Residential', 'LEO Satellite', 'leo-satellite', 220, 25, 120, 65, false, '#', 'Better latency than traditional satellite, but obstructions and weather can still affect performance. Availability: Sample rural/open-sky areas.', 'sample', true),
  ((select id from public.providers where slug = 'skyreach'), 'fallback-skyreach-satellite', 'SkyReach Rural 100', 'Traditional Satellite', 'satellite', 100, 3, 80, 650, true, '#', 'Broad rural coverage, but high latency and weather sensitivity make it weaker for gaming/video calls. Availability: Sample remote areas.', 'sample', true)
on conflict (slug) do update set
  provider_id = excluded.provider_id,
  name = excluded.name,
  technology = excluded.technology,
  transport_type = excluded.transport_type,
  max_download_mbps = excluded.max_download_mbps,
  max_upload_mbps = excluded.max_upload_mbps,
  estimated_monthly_price = excluded.estimated_monthly_price,
  estimated_latency_ms = excluded.estimated_latency_ms,
  contract_required = excluded.contract_required,
  referral_url = excluded.referral_url,
  availability_notes = excluded.availability_notes,
  source = excluded.source,
  active = excluded.active;

insert into public.provider_links (provider_name, provider_slug, market, referral_url, active)
values
  ('FiberFast', 'fiberfast', 'sample', '#', true),
  ('CableWave', 'cablewave', 'sample', '#', true),
  ('AirTower Home', 'airtower', 'sample', '#', true),
  ('RuralBeam', 'ruralbeam', 'sample', '#', true),
  ('BudgetNet', 'budgetnet', 'sample', '#', true),
  ('Starlink Sample', 'starlink-sample', 'sample', '#', true),
  ('SkyReach Satellite', 'skyreach', 'sample', '#', true)
on conflict do nothing;
