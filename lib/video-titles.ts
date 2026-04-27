import type { MemorialVideo } from "@/data/topics";
import titleOverrides from "@/data/video-title-overrides.json";
import { getYoutubeId } from "./youtube";

type OneTitle = { en: string; zh: string };
type MapType = Record<string, OneTitle>;

const map: MapType = titleOverrides as MapType;

/**
 * Titles to show in the UI: English line + 中文 line.
 * If `data/video-title-overrides.json` has an entry for this video (from
 * `npm run refresh-titles`), those values are used. Otherwise falls back to
 * `data/topics.ts` (title + titleZh).
 */
export function getVideoDisplayTitles(video: MemorialVideo): OneTitle {
  const id = getYoutubeId(video.url);
  if (id) {
    const o = map[id];
    if (o?.en && o?.zh) {
      return { en: o.en, zh: o.zh };
    }
  }
  return {
    en: video.title,
    zh: video.titleZh?.trim() ? video.titleZh : video.title,
  };
}

export function getVideoLabelForIframe(video: MemorialVideo): string {
  const { en, zh } = getVideoDisplayTitles(video);
  return `${en} / ${zh}`;
}
