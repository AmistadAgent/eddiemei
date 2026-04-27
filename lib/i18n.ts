/**
 * App chrome: every string is English + 繁體中文 on the same page.
 * Memory titles/captions live in data/topics.ts (per-item en/zh fields).
 */
export const ui = {
  tagline: { en: "A life remembered through moments", zh: "以影像回顧他的一生" },
  chooseTopic: { en: "Choose a memory topic", zh: "選擇回憶主題" },
  headphones: { en: "Headphones recommended", zh: "建議使用耳機" },
  /** Screen reader name for the home reel player */
  reelVideoAria: { en: "Memorial video", zh: "紀念影片" },
  /** Shown under the video */
  topicsBelow: {
    en: "More memories are below—choose a topic to watch.",
    zh: "更多回憶在下方，請點主題觀看影片。",
  },
  jumpToTopics: { en: "Jump to memory topics", zh: "前往回憶主題" },
  backToTopics: { en: "Back to all topics", zh: "返回主題" },
  nowViewing: { en: "Now viewing", zh: "正在觀看" },
  backToTopicList: {
    en: "Back to this topic’s videos",
    zh: "返回本主題的影片",
  },
  previousVideo: { en: "Previous video", zh: "上一支影片" },
  nextVideo: { en: "Next video", zh: "下一支影片" },
  playVideo: { en: "Play this video", zh: "播放影片" },
  simpleMode: { en: "Use simple view", zh: "使用簡化畫面" },
  simpleModeOff: { en: "Back to full view", zh: "返回完整畫面" },
  guidedHint: {
    en: "A life remembered through moments.",
    zh: "以影像回顧他的一生",
  },
  invalidYoutube: {
    en: "This video could not be loaded. Use a valid YouTube or direct .mp4 link in data/topics.ts.",
    zh: "無法播放此影片。請在 data/topics.ts 使用有效的 YouTube 或 .mp4 連結。",
  },
  notFoundTitle: { en: "Page not found", zh: "找不到頁面" },
  notFoundBody: {
    en: "That memory topic does not exist.",
    zh: "沒有這個回憶主題。",
  },
  notFoundCta: { en: "Back to the home gallery", zh: "回到首頁" },
  /** Optional Spotify block on home */
  spotifyHeading: {
    en: "His favorite music",
    zh: "他最喜歡的音樂",
  },
  spotifyHint: {
    en: "Enjoy his favorite music",
    zh: "享受他最喜歡的音樂",
  },
} as const;

export type Bilingual = { en: string; zh: string };
