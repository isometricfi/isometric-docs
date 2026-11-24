# Isometric Docs

Public user documentation for Isometric, served at `docs.isometric.fi`. A
[Holocron](https://holocron.so) site deployed as the Cloudflare Worker `isometric-docs-production`.

| Path         | Role                                                     |
| ------------ | -------------------------------------------------------- |
| `src`        | English MDX pages; `src/<locale>` holds each translation |
| `docs.jsonc` | Site settings and navigation; only listed pages publish  |
| `public`     | Logos, favicon, figures, and `robots.txt`                |
| `e2e`        | Playwright check of the sitemap and Markdown page output |

## Setup

```bash
vp install
vp run dev   # http://localhost:4302
```

| Command           | Does                                                    |
| ----------------- | ------------------------------------------------------- |
| `vp run dev`      | Serves the site with hot reload                         |
| `vp check`        | Format, lint, and type checks                           |
| `vp run build`    | Builds the Worker bundle                                |
| `vp run start`    | Previews the Worker build                               |
| `vp run test:e2e` | Checks `robots.txt`, the sitemap, `llms.txt`, and `.md` |
| `vp run ready`    | All checks, the build, and the browser check            |
| `vp run deploy`   | Builds and publishes `isometric-docs-production`        |

Run `vp exec playwright install chromium` once before the first browser check.

## Locales

The site matches the app's languages: `zh-CN`, `zh-TW`, `es`, `pt-BR`, `ko`, `tr`, and `vi`. Each
is a `navigation.versions` entry in `docs.jsonc` with its own `lang`, served under `/<locale>/`.
English stays at the root. A translated page mirrors the English path, so `src/trade/fees.mdx` is
`src/ko/trade/fees.mdx` at `/ko/trade/fees`.

## Deployment

Do not run `vp run deploy` until deployment is approved. Copy `.env.example` to `.env` and set
`CLOUDFLARE_ACCOUNT_ID` first. Wrangler reads it from there, so the account stays out of
`wrangler.jsonc`. The `docs.isometric.fi` custom domain is managed outside this repository; do not
add a route or custom domain in `wrangler.jsonc`.

Holocron generates the sitemap, `llms.txt`, `llms-full.txt`, and a Markdown copy of each page from
the `docs.jsonc` navigation. The social card in each page's `og:image` is served by the main site
at `https://isometric.fi/docs-opengraph.png`.
