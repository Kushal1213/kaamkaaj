# KaamKaaj

KaamKaaj is a candidate-first recruitment marketplace for practical job discovery, saved roles, application tracking and employer hiring workflows.

Live site: <https://kushal1213.github.io/kaamkaaj/>

## Included in this MVP

- Responsive landing page and new KaamKaaj brand system
- Persistent English and Hindi interface, including listings and application flows
- Candidate and employer device sign-in with profile menu and sign-out
- Search by role, skill, company, city and locality
- Work-type and work-mode filters
- Job detail experience with safety guidance
- Saved jobs persisted in browser storage
- Quick-apply flow and local application tracker
- Employer landing and interest flow
- Fast local listings that keep the product usable without an always-on backend
- Empty states, keyboard focus states and reduced-motion support

The current release uses device-based sessions and browser storage, keeping hosting costs at zero while the managed authentication and database layer is prepared.

## Run locally

```bash
npm install
npm run dev
```

Build the production bundle with:

```bash
npm run build
```

The generated `dist/` directory is deployed automatically to GitHub Pages after every push to `main`. The same static output remains portable to Cloudflare Pages or another static host later.

## Initial hosting architecture

The MVP intentionally builds to static HTML, CSS and JavaScript. Browser storage supports saved jobs and the application tracker, so there is no always-on server cost during product validation.

When real users and listings are introduced, keep the UI and replace `src/data/jobs.ts` with an API adapter. A practical next phase is:

1. Managed Postgres and authentication for candidates, employers and jobs.
2. Object storage only when resumes or company media are required.
3. Serverless functions for application submission and employer verification.
4. Search service only after the database search becomes a measured bottleneck.

See [docs/PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md) for the staged roadmap.
