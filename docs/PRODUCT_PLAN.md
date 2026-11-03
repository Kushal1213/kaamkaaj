# KaamKaaj product plan

## Product position

KaamKaaj should begin as a focused job-discovery product for candidates who care about pay, locality, schedule and simple applications. The supplied JobRaahi project demonstrates a much larger platform: candidate accounts, recruiters, field sourcers, administration, referrals, messaging, analytics and multiple API generations. Rebuilding every module on day one would create cost and operational risk before the core marketplace is validated.

## Phase 0: current prototype

- Static React application
- Demo listings
- Local saved jobs and application tracking
- Candidate-first navigation
- Employer proposition and lead-flow prototype
- No database, authentication, file uploads or paid services

## Phase 1: first public MVP

- Candidate sign-in with phone or email
- Employer sign-in and verified company profiles
- Job create, edit, publish and close workflow
- Candidate profile with skills, experience and preferred location
- Real applications and status history
- Basic moderation and abuse reporting
- Privacy, terms, consent and data-retention policy

Keep this phase on one web application, one relational database and object storage. Avoid microservices, vector search, background queues and a separate admin frontend until usage proves the need.

## Phase 2: marketplace operations

- Admin review queue and employer verification
- Saved searches and opt-in job alerts
- Candidate and employer communication controls
- Referral attribution
- Structured analytics for search, view, save and apply conversion
- Hindi content and an additional regional language selected from user demand

## Phase 3: scale modules

- Recruiter teams and role-based access
- Candidate sourcing tools
- Bulk imports with validation
- Interview scheduling
- Search ranking experiments
- Background processing for notifications and documents
- Dedicated read models or search infrastructure only after measured database limits

## Architecture boundaries

- `src/data` contains demo records now and should later export repository interfaces.
- Product components accept typed records instead of calling a provider directly.
- Saved jobs and applications use browser storage only in Phase 0.
- Auth, persistence, analytics and notifications should each be independent adapters.
- User-facing copy must not promise verification until an operational review process exists.

## Free-tier priorities

- Ship the `dist/` static bundle to Cloudflare Pages first. The current free plan documents 500 builds per month, up to 20,000 files per site and a 25 MiB limit per asset, which leaves ample room for this MVP.
- Treat Vercel Hobby as a personal prototype option only; Vercel currently states that Hobby is restricted to personal, non-commercial use.
- Compress media and avoid autoplay video.
- Keep dependencies small and lazy-load future account areas.
- Cache public job lists at the edge once an API exists.
- Add observability with strict sampling and short retention.
- Track usage limits in an internal operations checklist before inviting employers.

## Success signals before expanding

- Search-to-detail click rate
- Detail-to-save and detail-to-apply conversion
- Candidate completion rate for the shortest viable profile
- Employer time to publish a valid job
- Application response rate and time to first employer action
- Reports per listing and verification turnaround time
