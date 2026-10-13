# Desktop and tablet mockup (not part of the build)

Static HTML mockup for Carlo's review. Nothing here is deployed; the site build reads only src/ and public/.

- index.html: home. hair-systems.html: the service page template (used by 18 pages).
- Scope: 768px and wider. The approved phone layout (under 768px) does not change.
- Rule from the brief: every section is exactly one screen under the header, on every laptop, desktop and tablet.
- fit-test.mjs: Playwright check that every section is one screen tall and nothing spills out, at 1920x960, 1536x730, 1440x790, 1366x650, 1280x600, 1366x930, 1180x760, 1024x700, 1024x1270, 820x1100 and 768x950. Last run: 0 issues on both pages.
- Hero photo changed to src/assets/mhts-consultation-room-hero.jpg (brighter studio shot, not darkened).
