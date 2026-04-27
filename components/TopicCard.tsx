import Link from "next/link";
import type { MemorialTopic } from "@/data/topics";

type TopicCardProps = {
  topic: MemorialTopic;
  simpleMode: boolean;
  /** Home: open gallery on the same page. Omit to use `/topic/[slug]`. */
  onSelect?: (slug: string) => void;
};

export function TopicCard({ topic, simpleMode, onSelect }: TopicCardProps) {
  const hasDesc = Boolean(
    (topic.description?.trim() || topic.descriptionZh?.trim()) && !simpleMode
  );

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
    "group flex min-h-[120px] w-full flex-col items-stretch justify-center gap-1 rounded-2xl border-2 border-[--ink-soft] bg-[--card] px-8 py-10 text-left shadow-sm transition [transition-property:box-shadow,transform,background-color] active:scale-[0.99] sm:min-h-[140px] sm:px-10 sm:py-12 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[--accent]";

  if (onSelect) {
    return (
      <button type="button" onClick={() => onSelect(topic.slug)} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/topic/${topic.slug}/`} className={className}>
      {inner}
    </Link>
  );
}
