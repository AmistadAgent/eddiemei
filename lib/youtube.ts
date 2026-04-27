/**
 * Helpers for YouTube watch / youtu.be / embed URLs and thumbnails.
 * Paste full URLs from YouTube; unlisted works the same as public in embeds.
 */
export function getYoutubeId(url: string): string | null {
  const normalized = url.trim();
  if (!normalized) return null;
  const patterns: RegExp[] = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = normalized.match(p);
    if (m?.[1]) return m[1];
  }
  return null;
}

export function getYoutubeThumbnail(videoId: string, quality: "max" | "hq" = "hq") {
  const name = quality === "max" ? "maxresdefault" : "hqdefault";
  return `https://i.ytimg.com/vi/${videoId}/${name}.jpg`;
}

export function getYoutubeEmbedUrl(
  videoId: string,
  opts: { autoplay?: boolean } = {}
) {
  const p = new URLSearchParams();
  p.set("rel", "0");
  p.set("modestbranding", "1");
  if (opts.autoplay) p.set("autoplay", "1");
  return `https://www.youtube.com/embed/${videoId}?${p.toString()}`;
}
