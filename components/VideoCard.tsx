import Image from "next/image";
import type { MemorialVideo } from "@/data/topics";
import { ui } from "@/lib/i18n";
import { getYoutubeId, getYoutubeThumbnail } from "@/lib/youtube";
import { BilingualLines } from "./BilingualLines";

type VideoCardProps = {
  video: MemorialVideo;
  index: number;
  onOpen: (index: number) => void;
};

export function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const t = getYoutubeId(video.url);
  const thumb =
    video.thumbnailOverride || (t ? getYoutubeThumbnail(t, "max") : null);
  const titleZh = video.titleZh ?? video.title;
  const capEn = video.caption;
  const capZh = video.captionZh ?? video.caption;
  const hasCaption = Boolean(capEn?.trim());
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
          {video.title}
        </span>
        <span className="font-serif text-xl text-[--ink-muted] sm:text-2xl" lang="zh-Hant">
          {titleZh}
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
