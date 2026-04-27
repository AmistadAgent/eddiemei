"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import type { MemorialTopic } from "@/data/topics";
import { ui } from "@/lib/i18n";
import { getYoutubeEmbedUrl, getYoutubeId } from "@/lib/youtube";
import { ariaBilingual, BilingualLines } from "./BilingualLines";
import { VideoCard } from "./VideoCard";

type TopicVideoSectionProps = {
  topic: MemorialTopic;
  simpleMode: boolean;
  /** Home: thumbnail grid. Topic page: stacked row cards */
  videoLayout?: "list" | "grid";
  /**
   * When set, the player’s “Back to all topics” calls this (stays on home)
   * instead of navigating to `/`.
   */
  onExitToAllTopics?: () => void;
};

export function TopicVideoSection({
  topic,
  simpleMode,
  videoLayout = "list",
  onExitToAllTopics,
}: TopicVideoSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;
  const idBase = useId();
  const titleId = `${idBase}-title`;

  const n = topic.videos.length;
  const current = openIndex ?? 0;
  const video = topic.videos[current];
  const vid = video ? getYoutubeId(video.url) : null;
  const showNav = n > 1;
  const videoTitleI18n = video
    ? `${video.title} / ${video.titleZh ?? video.title}`
    : "";

  const goPrev = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((i) => {
      if (i == null) return 0;
      return i === 0 ? n - 1 : i - 1;
    });
  }, [openIndex, n]);

  const goNext = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((i) => {
      if (i == null) return 0;
      return i === n - 1 ? 0 : i + 1;
    });
  }, [openIndex, n]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenIndex(null);
      } else if (e.key === "ArrowLeft" && showNav) {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight" && showNav) {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, showNav, goPrev, goNext]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`mx-auto flex w-full max-w-3xl flex-col ${simpleMode ? "gap-10" : "gap-8"}`}
    >
      <div
        className="space-y-2 sm:space-y-3"
        id={titleId}
        aria-live="polite"
      >
        <BilingualLines
          text={ui.nowViewing}
          enClassName="font-sans text-xl font-medium text-[--ink] sm:text-2xl"
          zhClassName="text-lg sm:text-xl"
        />
        <div>
          <p
            className="font-serif text-2xl font-medium text-[--ink] sm:text-3xl"
            lang="en"
          >
            {topic.label}
          </p>
          <p
            className="mt-1 font-serif text-2xl font-medium text-[--ink-muted] sm:text-3xl"
            lang="zh-Hant"
          >
            {topic.labelZh}
          </p>
        </div>
      </div>
      <ul
        className={
          videoLayout === "grid"
            ? "grid w-full list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
            : "flex list-none flex-col items-center gap-6 sm:gap-8"
        }
        role="list"
        aria-labelledby={titleId}
      >
        {topic.videos.map((v, i) => (
          <li key={i} className={videoLayout === "grid" ? "min-w-0" : "w-full"} role="none">
            <VideoCard
              video={v}
              index={i}
              onOpen={setOpenIndex}
              layout={videoLayout === "grid" ? "grid" : "row"}
            />
          </li>
        ))}
      </ul>

      {open && video && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#1a1a1a]/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={videoTitleI18n}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4">
              {onExitToAllTopics ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpenIndex(null);
                    onExitToAllTopics();
                  }}
                  className="inline-flex min-h-[56px] min-w-0 max-w-2xl flex-1 flex-col items-center justify-center rounded-2xl border-2 border-white/50 bg-white px-4 py-3 text-center text-[#1a1a1a] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-100"
                  aria-label={ariaBilingual(ui.backToTopics)}
                >
                  <BilingualLines
                    text={ui.backToTopics}
                    enClassName="text-lg font-medium sm:text-xl"
                    zhClassName="!mt-1 text-sm sm:text-base"
                    gapClassName="mt-0.5"
                  />
                </button>
              ) : (
                <Link
                  href="/"
                  className="inline-flex min-h-[56px] min-w-0 max-w-2xl flex-1 flex-col items-center justify-center rounded-2xl border-2 border-white/50 bg-white px-4 py-3 text-center text-[#1a1a1a] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-100"
                  aria-label={ariaBilingual(ui.backToTopics)}
                >
                  <BilingualLines
                    text={ui.backToTopics}
                    enClassName="text-lg font-medium sm:text-xl"
                    zhClassName="!mt-1 text-sm sm:text-base"
                    gapClassName="mt-0.5"
                  />
                </Link>
              )}
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="min-h-[56px] w-full max-w-3xl flex-1 flex-col items-center justify-center rounded-2xl border-2 border-white/40 bg-white/10 px-4 py-3 text-left text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-100 sm:ml-auto sm:max-w-md sm:items-center"
                aria-label={ariaBilingual(ui.backToTopicList)}
              >
                <BilingualLines
                  text={ui.backToTopicList}
                  enClassName="text-lg font-medium sm:text-xl"
                  zhClassName="!mt-1 text-sm sm:text-base"
                  gapClassName="mt-0.5"
                />
              </button>
            </div>

            {vid ? (
              <div className="mx-auto w-full max-w-5xl flex-1 overflow-hidden rounded-xl bg-black shadow-2xl">
                <div className="relative aspect-video w-full">
                  <iframe
                    key={vid + current}
                    title={videoTitleI18n}
                    className="absolute inset-0 h-full w-full"
                    src={getYoutubeEmbedUrl(vid, { autoplay: true })}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <p className="px-2 text-center text-amber-100/95">
                <BilingualLines
                  text={ui.invalidYoutube}
                  enClassName="text-base sm:text-lg"
                  zhClassName="!mt-2 text-sm sm:text-base"
                  gapClassName="mt-1.5"
                />
              </p>
            )}

            <div className="mx-auto w-full max-w-5xl flex-shrink-0 text-center text-white">
              <h2 className="font-serif text-3xl font-medium sm:text-4xl" lang="en">
                {video.title}
              </h2>
              <p
                className="mt-1 font-serif text-2xl text-white/85 sm:text-3xl"
                lang="zh-Hant"
              >
                {video.titleZh ?? video.title}
              </p>
              {video.caption && (
                <p
                  className="mt-3 text-lg text-white/80 sm:text-xl"
                  lang="en"
                >
                  {video.caption}
                </p>
              )}
              {video.captionZh && (
                <p
                  className="mt-1 text-lg text-white/70 sm:text-xl"
                  lang="zh-Hant"
                >
                  {video.captionZh}
                </p>
              )}
            </div>

            {showNav && (
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
                <button
                  type="button"
                  onClick={goPrev}
                  className="min-h-[60px] flex-1 rounded-2xl border-2 border-white/50 bg-white/15 px-4 py-3 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-100 sm:min-w-[200px]"
                  aria-label={ariaBilingual(ui.previousVideo)}
                >
                  <BilingualLines
                    text={ui.previousVideo}
                    enClassName="text-base font-medium sm:text-xl"
                    zhClassName="!mt-1 text-sm sm:text-base"
                    gapClassName="mt-0.5"
                  />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="min-h-[60px] flex-1 rounded-2xl border-2 border-white/50 bg-white/15 px-4 py-3 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-100 sm:min-w-[200px]"
                  aria-label={ariaBilingual(ui.nextVideo)}
                >
                  <BilingualLines
                    text={ui.nextVideo}
                    enClassName="text-base font-medium sm:text-xl"
                    zhClassName="!mt-1 text-sm sm:text-base"
                    gapClassName="mt-0.5"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
