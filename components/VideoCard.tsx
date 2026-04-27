import Image from "next/image";
import type { MemorialVideo } from "@/data/topics";
import { ui } from "@/lib/i18n";
import { getVideoDisplayTitles } from "@/lib/video-titles";
import { getYoutubeId, getYoutubeThumbnail } from "@/lib/youtube";
import { BilingualLines } from "./BilingualLines";

type VideoCardProps = {
  video: MemorialVideo;
  index: number;
  onOpen: (index: number) => void;
  /** `grid` = thumbnail on top, titles below (home gallery) */
  layout?: "row" | "grid";
};

export function VideoCard({ video, index, onOpen, layout = "row" }: VideoCardProps) {
  const t = getYoutubeId(video.url);
  const thumb =
    video.thumbnailOverride || (t ? getYoutubeThumbnail(t, "max") : null);
  const titles = getVideoDisplayTitles(video);
  const capEn = video.caption;
  const capZh = video.captionZh ?? video.caption;
  const hasCaption = Boolean(capEn?.trim());

  if (layout === "grid") {
    return (
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="group flex h-full w-full min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-[--ink-soft] bg-[--card] text-left shadow-sm transition [transition-property:box-shadow,transform] active:scale-[0.99] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[--accent]"
      >
        <span className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#0a0a0a]/5">
          {thumb ? (
            <Image
              src={thumb}
              alt=""
              width={640}
              height={360}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <span className="flex aspect-video w-full items-center justify-center bg-[--mist] px-2 text-center text-sm text-[--ink-muted]">
              <BilingualLines
                text={ui.playVideo}
                enClassName="text-sm"
                zhClassName="!mt-0 text-xs"
                gapClassName="mt-0.5"
              />
            </span>
          )}
        </span>
        <span className="flex flex-1 flex-col p-3 sm:p-4">
          <span
            className="font-serif text-lg font-medium leading-snug text-[--ink] sm:text-xl"
            lang="en"
          >
            {titles.en}
          </span>
          <span
            className="mt-1 line-clamp-2 font-sans text-base text-[--ink-muted] sm:text-lg"
            lang="zh-Hant"
          >
            {titles.zh}
          </span>
          {hasCaption && capEn && (
            <span
              className="mt-1 line-clamp-2 text-sm text-[--ink-faint] sm:text-base"
              lang="en"
            >
              {capEn}
            </span>
          )}
        </span>
        <span className="mt-auto border-t border-[--ink-soft]/30 px-3 pb-3 sm:px-4 sm:pb-4">
          <span className="inline-flex rounded-md bg-[--accent-muted] px-2 py-1.5 text-left text-sm font-medium text-[--ink] sm:text-base">
            <BilingualLines
              text={ui.playVideo}
              enClassName="text-sm"
              zhClassName="!mt-0 text-xs"
              gapClassName="mt-0.5"
            />
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border-2 border-[--ink-soft] bg-[--card] text-left shadow-sm transition [transition-property:box-shadow,transform] active:scale-[0.99] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[--accent] sm:flex-row"
    >
      <span className="relative aspect-video w-full shrink-0 sm:max-w-md sm:aspect-auto sm:min-h-[200px] sm:w-2/5">
        {thumb ? (
          <Image
            src={thumb}
            alt=""
            width={1280}
            height={720}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <span className="flex h-full min-h-[180px] w-full flex-col items-center justify-center gap-0 bg-[--mist] px-3 text-center sm:min-h-[200px]">
            <BilingualLines
              text={ui.playVideo}
              enClassName="text-base text-[--ink] sm:text-lg"
              zhClassName="!mt-0 text-sm sm:text-base"
              gapClassName="mt-1"
            />
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:gap-2 sm:py-6 sm:pl-8">
        <span className="font-serif text-2xl font-medium text-[--ink] sm:text-3xl" lang="en">
          {titles.en}
        </span>
        <span className="font-serif text-xl text-[--ink-muted] sm:text-2xl" lang="zh-Hant">
          {titles.zh}
        </span>
        {hasCaption && (
          <>
            <span className="text-lg text-[--ink-muted] sm:text-xl" lang="en">
              {capEn}
            </span>
            {capZh && (
              <span className="text-lg text-[--ink-faint] sm:text-xl" lang="zh-Hant">
                {capZh}
              </span>
            )}
          </>
        )}
        <span className="mt-2 inline-flex w-fit max-w-full flex-col rounded-lg bg-[--accent-muted] px-3 py-2 text-left">
          <BilingualLines
            text={ui.playVideo}
            enClassName="text-base font-medium text-[--ink] sm:text-lg"
            zhClassName="!mt-0 text-sm sm:text-base"
            gapClassName="mt-0.5"
          />
        </span>
      </span>
    </button>
  );
}
