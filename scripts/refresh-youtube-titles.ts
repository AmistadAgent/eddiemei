/**
 * Fetches each video’s title from YouTube oEmbed, adds Traditional Chinese
 * via MyMemory (free), writes data/video-title-overrides.json
 *
 * Run: npm run refresh-titles
 * Requires network. Re-run when you add/change YouTube URLs in data/topics.ts.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { topics } from "../data/topics";
import { getYoutubeId } from "../lib/youtube";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function mostlyChinese(s: string): boolean {
  const cjk = s.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  return cjk / Math.max(s.length, 1) > 0.35;
}

async function oembedTitle(url: string): Promise<string | null> {
  const u = new URL("https://www.youtube.com/oembed");
  u.searchParams.set("url", url);
  u.searchParams.set("format", "json");
  const r = await fetch(u);
  if (!r.ok) {
    console.warn("oembed failed", r.status, url);
    return null;
  }
  const j = (await r.json()) as { title?: string };
  return j.title?.trim() ?? null;
}

async function translate(text: string, langpair: string): Promise<string | null> {
  const u = new URL("https://api.mymemory.translated.net/get");
  u.searchParams.set("q", text.slice(0, 450));
  u.searchParams.set("langpair", langpair);
  const r = await fetch(u);
  if (!r.ok) return null;
  const j = (await r.json()) as { responseData?: { translatedText?: string } };
  return j.responseData?.translatedText?.trim() ?? null;
}

async function toEnAndZh(ytTitle: string): Promise<{ en: string; zh: string }> {
  if (mostlyChinese(ytTitle)) {
    const en = (await translate(ytTitle, "zh|en")) ?? ytTitle;
    return { en, zh: ytTitle };
  }
  const zh = (await translate(ytTitle, "en|zh-TW")) ?? ytTitle;
  return { en: ytTitle, zh };
}

async function main() {
  const out: Record<string, { en: string; zh: string }> = {};
  const seen = new Set<string>();
  for (const topic of topics) {
    for (const v of topic.videos) {
      const id = getYoutubeId(v.url);
      if (!id || seen.has(id)) continue;
      seen.add(id);
      console.log("Fetching oEmbed for", id, "…");
      const t = await oembedTitle(v.url);
      if (!t) {
        await sleep(300);
        continue;
      }
      const pair = await toEnAndZh(t);
      out[id] = pair;
      console.log("  →", pair.en, "|", pair.zh);
      await sleep(400);
    }
  }
  const path = join(process.cwd(), "data/video-title-overrides.json");
  writeFileSync(path, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log("Wrote", path, "—", Object.keys(out).length, "video(s).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
