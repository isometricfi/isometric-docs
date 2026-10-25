import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

test.use({ javaScriptEnabled: false, screenshot: "off" });

test("serves a docs sitemap and Markdown guide for every public docs page", async ({
  request,
  page,
}) => {
  // given
  const docsOrigin = "http://127.0.0.1:14302";
  const paths = navigationPages(readFileSync("docs.jsonc", "utf8")).map((page) =>
    page === "index" ? "/" : `/${page}`,
  );

  // when
  const robots = await request.get(`${docsOrigin}/robots.txt`);
  const sitemap = await request.get(`${docsOrigin}/sitemap.xml`);
  const guide = await request.get(`${docsOrigin}/llms.txt`);
  const xml = await page.evaluate(
    (source) => {
      const document = new DOMParser().parseFromString(source, "application/xml");
      return {
        error: document.querySelector("parsererror")?.textContent,
        namespace: document.documentElement.namespaceURI,
        urls: Array.from(document.querySelectorAll("url > loc"), (node) => node.textContent),
      };
    },
    await sitemap.text(),
  );

  // then
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toBe(
    "User-agent: *\nAllow: /\n\nSitemap: https://docs.isometric.fi/sitemap.xml\n",
  );
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("application/xml");
  expect(xml.error).toBeUndefined();
  expect(xml.namespace).toBe("http://www.sitemaps.org/schemas/sitemap/0.9");
  expect(xml.urls.sort()).toEqual(paths.map((path) => `${docsOrigin}${path}`).sort());
  expect(guide.status()).toBe(200);
  const markdown = await guide.text();
  expect(markdown).toMatch(/^# Isometric\n/);
  for (const path of paths) {
    const markdownPath = path === "/" ? "/index.md" : `${path}.md`;
    expect(markdown).toContain(`${docsOrigin}${markdownPath}`);
    const response = await request.get(`${docsOrigin}${markdownPath}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/markdown");
    expect(await response.text()).not.toContain("<!DOCTYPE html>");
  }
});

/** Pages listed in the docs navigation; a page left out of it is not published. */
function navigationPages(config: string): string[] {
  const uncommented = config
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  return Array.from(uncommented.matchAll(/"pages":\s*\[([^\]]*)\]/g)).flatMap((match) =>
    Array.from(match[1]?.matchAll(/"([^"]+)"/g) ?? [], (page) => page[1] ?? ""),
  );
}
