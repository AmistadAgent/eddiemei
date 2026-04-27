/**
 * Eddie Mei — memory gallery content
 * =================================
 * Edit this file to add/change topics and videos.
 *
 * VIDEOS: `url` can be:
 *   - YouTube: watch, youtu.be, embed (unlisted OK; thumbnails from YouTube)
 *   - Direct file: .mp4 / .webm on HTTPS (e.g. S3) — use `thumbnailOverride` for a
 *     static image, or the card shows a simple placeholder
 *
 * Titles: optional labels in this file are fallbacks. To show each video’s real
 * YouTube title (English) plus auto-translated 繁體中文, run:
 *   npm run refresh-titles
 * That writes/updates `data/video-title-overrides.json` (commit it for deploys).
 */

export type MemorialVideo = {
  title: string;
  titleZh?: string;
  /** Optional line under the title */
  caption?: string;
  captionZh?: string;
  /** PASTE YOUR YOUTUBE URL HERE (unlisted or public) */
  url: string;
  /** If you need a custom image instead of YouTube’s thumbnail, set a path under /public or an absolute image URL */
  thumbnailOverride?: string;
};

export type MemorialTopic = {
  slug: string;
  label: string;
  labelZh: string;
  /** Shown on topic cards; keep short */
  description?: string;
  descriptionZh?: string;
  videos: MemorialVideo[];
};

/** `jNQXAC9IVRw` = placeholder so previews work; replace with your own links */
const PLACEHOLDER = "https://www.youtube.com/watch?v=jNQXAC9IVRw";

export const topics: MemorialTopic[] = [
  {
    slug: "fishing",
    label: "Fishing",
    labelZh: "釣魚",
    description: "By the water",
    descriptionZh: "水邊時光",
    videos: [
      { title: "Memory 1", titleZh: "釣魚（一）", url: "https://youtu.be/xvMEccbpi0Y" },
      { title: "Memory 2", titleZh: "釣魚（二）", url: "https://youtu.be/8jhOhTF7dtE" },
      { title: "Memory 3", titleZh: "釣魚（三）", url: "https://youtu.be/732jDhnqEsE" },
      { title: "Memory 4", titleZh: "釣魚（四）", url: "https://youtu.be/pPvxJRH0o1A" },
    ],
  },
  {
    slug: "smoking",
    label: "Smoking",
    labelZh: "抽菸 / 風格",
    description: "A familiar scene",
    descriptionZh: "熟悉的身影",
    videos: [
      {
        title: "dad smoking",
        titleZh: "爸爸抽菸",
        url: "https://youtu.be/otBuxzAafn4",
      },
    ],
  },
  {
    slug: "dad-being-dad",
    label: "Dad Being Dad at Home",
    labelZh: "在家當爸的樣子",
    description: "At home with family",
    descriptionZh: "與家人在家",
    videos: [
      { title: "Memory 1", titleZh: "在家（一）", url: "https://youtu.be/zHLlg5NpQ9I" },
      { title: "Memory 2", titleZh: "在家（二）", url: "https://youtu.be/6-1BKEcIDBI" },
      { title: "Memory 3", titleZh: "在家（三）", url: "https://youtu.be/gzHic72q0Sk" },
      {
        title: "2000s VCR highlights",
        titleZh: "2000 年代 VCR 精選",
        url: "https://eddiemei-memorial-assets.s3.us-east-1.amazonaws.com/2000s+VCR+Highlight+Video.mp4",
      },
    ],
  },
  {
    slug: "silly",
    label: "Silly",
    labelZh: "俏皮 / 搞笑",
    description: "The lighter side",
    descriptionZh: "輕鬆一面",
    videos: [
      {
        title: "Memory 3",
        titleZh: "俏皮（三）",
        url: "https://youtu.be/0IvEUdlrejk",
      },
    ],
  },
  {
    slug: "alaska",
    label: "Alaska",
    labelZh: "阿拉斯加",
    description: "Cold air, big sky",
    descriptionZh: "冷空氣、大天空",
    videos: [
      { title: "Memory 1", titleZh: "阿拉斯加（一）", url: "https://youtu.be/YcA_UFqwIiU" },
      { title: "Memory 2", titleZh: "阿拉斯加（二）", url: "https://youtu.be/jAIpOM0xkGo" },
    ],
  },
  {
    slug: "hainan",
    label: "Hainan",
    labelZh: "海南",
    description: "Island time",
    descriptionZh: "海島時光",
    videos: [
      { title: "Memory 1", titleZh: "海南（一）", url: "https://youtu.be/KpJT-B9BL0g" },
    ],
  },
  {
    slug: "malaysia",
    label: "Malaysia",
    labelZh: "馬來西亞",
    description: "Roots and return visits",
    descriptionZh: "根與回訪",
    videos: [
      {
        title: "Malaysia highlight reel",
        titleZh: "馬來西亞精選",
        url: "https://eddiemei-memorial-assets.s3.us-east-1.amazonaws.com/Malaysia+Highlight+Video.mp4",
      },
    ],
  },
  {
    slug: "vietnam",
    label: "Vietnam",
    labelZh: "越南",
    description: "Memories of the journey",
    descriptionZh: "旅途回憶",
    videos: [
      { title: "Along the way",
        titleZh: "路上",
        caption: "A chapter remembered",
        captionZh: "難忘的一章",
        url: PLACEHOLDER,
      },
    ],
  },
  {
    slug: "fixing-things",
    label: "Fixing Things",
    labelZh: "修理東西",
    description: "Hands that knew the work",
    descriptionZh: "熟練的雙手",
    videos: [
      { title: "In the garage",
        titleZh: "在車庫",
        url: PLACEHOLDER,
      },
      {
        title: "“Almost done”",
        titleZh: "「快好了」",
        url: PLACEHOLDER,
      },
    ],
  },
  {
    slug: "singing",
    label: "Singing",
    labelZh: "唱歌",
    description: "Voice and song",
    descriptionZh: "聲音與歌曲",
    videos: [
      { title: "A favorite tune",
        titleZh: "一首喜歡的歌",
        url: PLACEHOLDER,
      },
      {
        title: "With family",
        titleZh: "與家人",
        url: PLACEHOLDER,
      },
    ],
  },
];

const bySlug: Map<string, MemorialTopic> = new Map(
  topics.map((t) => [t.slug, t])
);

export function getTopicBySlug(slug: string): MemorialTopic | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return topics.map((t) => t.slug);
}
