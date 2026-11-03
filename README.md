# KaamKaaj

KaamKaaj is a candidate-first recruitment marketplace prototype inspired by the supplied JobRaahi project, but rebuilt as a fresh, lightweight product for an initial free-tier launch.

Live site: <https://kushal1213.github.io/kaamkaaj/>

## Included in this MVP

- Responsive landing page and new KaamKaaj brand system
- Search by role, skill, company, city and locality
- Work-type and work-mode filters
- Job detail experience with safety guidance
- Saved jobs persisted in browser storage
- Quick-apply flow and local application tracker
- Employer landing and interest flow
- Loading-free sample data that makes the prototype usable without a backend
- Empty states, keyboard focus states and reduced-motion support

All jobs and candidate profiles are clearly presented as demo content. No form data is sent to a server.

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
