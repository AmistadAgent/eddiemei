import Image from "next/image";
import Link from "next/link";
import type { MemorialTopic } from "@/data/topics";
import { getYoutubeId, getYoutubeThumbnail } from "@/lib/youtube";

type TopicCardProps = {
  topic: MemorialTopic;
  simpleMode: boolean;
  /** Home: open gallery on the same page. Omit to use `/topic/[slug]`. */
  onSelect?: (slug: string) => void;
};

/** Preview image for the topic row: first video’s thumbnail (YouTube or `thumbnailOverride`). */
function topicPreviewImageUrl(topic: MemorialTopic): string | null {
  const v = topic.videos[0];
  if (!v) return null;
  const override = v.thumbnailOverride?.trim();
  if (override) return override;
  const id = getYoutubeId(v.url);
  return id ? getYoutubeThumbnail(id, "max") : null;
}

export function TopicCard({ topic, simpleMode, onSelect }: TopicCardProps) {
  const hasDesc = Boolean(
    (topic.description?.trim() || topic.descriptionZh?.trim()) && !simpleMode
  );
  const previewUrl = topicPreviewImageUrl(topic);

  const inner = (
    <>
      <span
        className={`font-serif font-medium leading-tight text-[--ink] ${
          simpleMode ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        }`}
        lang="en"
      >
        {topic.label}
      </span>
      <span
        className="mt-1 font-sans text-xl text-[--ink-muted] sm:text-2xl"
        lang="zh-Hant"
      >
        {topic.labelZh}
      </span>
      {hasDesc && (
        <span className="mt-2 font-sans text-lg text-[--ink-faint] sm:text-xl" lang="en">
          {topic.description}
        </span>
      )}
      {hasDesc && topic.descriptionZh && (
        <span
          className="mt-1 font-sans text-lg text-[--ink-faint] sm:text-xl"
          lang="zh-Hant"
        >
          {topic.descriptionZh}
        </span>
      )}
    </>
  );

  const className =
    "group grid min-h-[100px] w-full grid-cols-[minmax(0,1fr)_auto] items-stretch overflow-hidden rounded-2xl border-2 border-[--ink-soft] bg-[--card] text-left shadow-sm transition [transition-property:box-shadow,transform,background-color] active:scale-[0.99] focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[--accent] sm:min-h-[112px]";

  /** Nearly full row height inside padded column; width follows 16:9 */
  const thumbClass =
    "relative min-h-[56px] h-full max-h-full w-auto shrink-0 aspect-video overflow-hidden rounded-xl bg-[#0a0a0a]/5 max-w-[min(42vw,280px)] sm:max-w-[min(38vw,320px)]";

  const preview = (
    <span className={thumbClass}>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt=""
          width={640}
          height={360}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          unoptimized
        />
      ) : (
        <span
          className="flex h-full min-h-0 w-full items-center justify-center bg-[--mist]"
          aria-hidden
        >
          <span className="h-px w-10 bg-[--ink-soft]/40 sm:w-12" />
        </span>
      )}
    </span>
  );

  const body = (
    <span className="flex min-h-0 min-w-0 flex-col justify-center gap-1 px-5 py-6 pr-3 sm:px-8 sm:py-8 sm:pr-4 md:px-10">
      {inner}
    </span>
  );

  const thumbWrap = (
    <span className="grid h-full min-h-0 shrink-0 grid-rows-[minmax(0,1fr)] justify-items-end py-2 pr-5 sm:pr-8 md:pr-10">
      {preview}
    </span>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={() => onSelect(topic.slug)} className={className}>
        {body}
        {thumbWrap}
      </button>
    );
  }

  return (
    <Link href={`/topic/${topic.slug}/`} className={className}>
      {body}
      {thumbWrap}
    </Link>
  );
}
