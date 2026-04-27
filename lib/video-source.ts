/**
 * YouTube vs direct file (S3 MP4, etc.) for playback and thumbnails.
 */
export function isDirectVideoFileUrl(url: string): boolean {
  try {
    const path = new URL(url).pathname;
    return /\.(mp4|webm|ogg|mov)$/i.test(path);
  } catch {
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url.trim());
  }
}
