# rohanparmar.com

Rohan Parmar’s personal site: a short biography, career journey, and publications.

## Local development

```bash
npm ci
npm run dev
```

The site runs at `http://localhost:3000`.

## Validate

```bash
npm run check
```

This runs ESLint, TypeScript, and the production static export. The deployable site is written to `out/`.

## Content map

- `app/page.tsx` — homepage
- `app/work/docula/page.tsx` — Docula case study
- `constants/site.ts` — profile, work, and publication metadata
- `app/layout.tsx` — site metadata and Person structured data

## Deployment

Pushing `master` runs `.github/workflows/deploy-pages.yml`, validates the project, exports the static site, and publishes `out/` to GitHub Pages.

The repository’s Pages source must be set to **GitHub Actions**. Verify the `.github.io` deployment before moving `rohanparmar.com` and enabling HTTPS in Pages settings.
