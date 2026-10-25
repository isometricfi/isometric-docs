<!--VITE PLUS START-->

# Using Vite+

This project uses Vite+, a unified toolchain built on Vite, Rolldown, Vitest, tsdown, Oxlint,
Oxfmt, and Vite Task. Use the `vp` CLI for package management and frontend tooling.

- Run `vp install` after pulling dependency changes.
- Run `vp check` for format, lint, and TypeScript checks.
- Run `vp env doctor` when runtime or package-manager behavior is wrong.
- Use current docs at https://viteplus.dev/guide/.

<!--VITE PLUS END-->

# Isometric Docs

The public user documentation for Isometric at `docs.isometric.fi`. A Holocron site served by a
Cloudflare Worker.

## Public Repository

- This repository is public. Keep account IDs, keys, private repository names, internal hosts, and
  infrastructure details out of files, commit messages, and pull requests.
- Wrangler reads `CLOUDFLARE_ACCOUNT_ID` from the gitignored `.env`. Never add `account_id` to
  `wrangler.jsonc`.

## Tech Stack

- Runtime and package manager: Bun
- Toolchain: Vite+ with Vite, Oxlint, Oxfmt, and Vite Task
- Site: Holocron with MDX pages in `src` and navigation in `docs.jsonc`
- Hosting: Cloudflare Workers
- Checks: Playwright for the sitemap, `llms.txt`, and Markdown page output

## Commits

- Use conventional commits: `feat`, `fix`, `chore`, `refactor`, and `docs`.
- Keep the subject under 72 characters. Do not add a commit body.
- Never commit without explicit permission.

## Deployment

- Never run `vp run deploy` or `wrangler deploy` without explicit approval.
- The `docs.isometric.fi` custom domain is managed outside this repository. Do not add a route or
  custom domain in `wrangler.jsonc`.

## Content

- Write for traders and liquidity providers, not for protocol developers.
- Every page must be listed in the `docs.jsonc` navigation. A page left out of it is not published.
- Keep each page's `og:image` frontmatter on `https://isometric.fi/docs-opengraph.png`. The main
  site serves that card.
- Keep numbers and parameters in step with the deployed contracts. Do not state a value the
  protocol does not enforce.

## General

- Prefer the smallest change that fully solves the task.
- Keep comments minimal. Explain non-obvious reasons, not visible code behavior.
- Do not use emojis. Never use all caps for headings.
- Fetch current documentation before using a library or API. Use Context7 first.

## Testing

Use the given/when/then pattern for all tests. Each `// given`, `// when`, and `// then` comment
must be on its own line and separated from the previous section by a blank line. Use a
descriptive behavioral test name and no doc comment.

## Definition Of Done

- Run `vp check` and `vp run build` after any change.
- Run `vp run test:e2e` after a change to `docs.jsonc`, a page path, `public/robots.txt`, or the
  Holocron version.
