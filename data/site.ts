/**
 * Site-wide assets (not topic videos).
 * Hero: swap the URL if you re-upload or use another host.
 */
export const HERO_IMAGE_URL =
  "https://ik.imagekit.io/yqhaxskw3/mmexport1768371008053.jpg" as const;

export const HERO_IMAGE_ALT = "Eddie Mei";

/**
 * Home “highlights” reel (MP4). No autoplay: guests press play.
 * Change this URL if you replace the file on S3.
 */
export const HIGHLIGHTS_REEL_URL =
  "https://eddiemei-memorial-assets.s3.us-east-1.amazonaws.com/20251002_181303.mp4" as const;

/**
 * Optional Spotify playlist embed on the home page. Set to "" to hide the block.
 * ID only: the part after open.spotify.com/playlist/
 */
export const SPOTIFY_PLAYLIST_ID: string = "1Tx7Xl8ybVwZj6F9wyJLuG";
