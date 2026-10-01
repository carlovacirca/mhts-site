// Two decisions of 28 September that are easy to undo by accident, so they are
// checked against the source rather than trusted:
//
//   1. The public email is info@menshairtostay.co.uk. The site used to publish
//      georgesbarbers1991@gmail.com, another business's gmail, on all 61 pages,
//      on /contact, on /faq and inside the LocalBusiness schema.
//   2. The brand is "Men's Hair To Stay". The built pages had it 203 times with
//      a capital T and 35 times without.
//
// See docs/HEALTH-CHECK.md finding 35 and docs/DESIGN-AUDIT.md finding 18.
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { EMAIL, BRAND, PHONE_TEL } from "./site";
import { localBusinessSchema } from "./seo";

const SRC = join(process.cwd(), "src");

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    // Test files are skipped: they quote the old strings on purpose.
    if (/\.(test|spec)\.(ts|tsx)$/.test(name)) return [];
    return /\.(ts|tsx|md)$/.test(name) ? [path] : [];
  });

const files = sourceFiles(SRC);

describe("site constants", () => {
  it("publishes the MHTS address", () => {
    expect(EMAIL).toBe("info@menshairtostay.co.uk");
    expect(localBusinessSchema.email).toBe(EMAIL);
  });

  it("uses one E.164 number for every tel: link", () => {
    expect(PHONE_TEL).toBe("+447947878087");
    expect(localBusinessSchema.telephone.replace(/\s/g, "")).toBe(PHONE_TEL);
  });

  it("spells the brand with a capital T", () => {
    expect(BRAND).toBe("Men's Hair To Stay");
  });
});

describe("nothing in src still carries the old details", () => {
  it("has no georgesbarbers1991 address anywhere", () => {
    const offenders = files.filter((f) => readFileSync(f, "utf8").includes("georgesbarbers1991"));
    expect(offenders).toEqual([]);
  });

  it('has no "Men\'s Hair to Stay" left, in any escaping', () => {
    const offenders = files.filter((f) => {
      const text = readFileSync(f, "utf8");
      return text.includes("Men's Hair to Stay") || text.includes("Men&apos;s Hair to Stay");
    });
    expect(offenders).toEqual([]);
  });

  it("keeps the Georges Barbers palette off every MHTS page", () => {
    const offenders = files
      .filter((f) => f.includes(join("src", "pages")) || f.includes(join("src", "components")))
      .filter((f) => !f.includes(join("components", "ui")))
      .filter((f) => /\bgb-(green|gold|cream|black)\b/.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
