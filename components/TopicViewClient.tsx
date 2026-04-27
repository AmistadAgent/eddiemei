"use client";

import Link from "next/link";
import type { MemorialTopic } from "@/data/topics";
import { ui } from "@/lib/i18n";
import { useMemorial } from "./MemorialProviders";
import { ariaBilingual, BilingualLines } from "./BilingualLines";
import { TopicVideoSection } from "./TopicVideoSection";

type TopicViewClientProps = {
  topic: MemorialTopic;
};

export function TopicViewClient({ topic }: TopicViewClientProps) {
  const { simpleMode } = useMemorial();
  return (
    <div className="memorial-warm min-h-dvh w-full max-w-5xl flex-col justify-start px-5 pb-16 pt-8 sm:px-10 sm:pt-10">
      <header className="mb-8 sm:mb-10">
        <Link
          href="/"
          className="inline-flex min-h-[56px] w-full min-w-0 max-w-2xl flex-col items-center justify-center rounded-2xl border-2 border-[--ink-soft] bg-white px-6 py-3 text-center text-[--ink] shadow-sm transition [transition-property:box-shadow,transform] active:scale-[0.99] sm:min-h-[64px] sm:py-4"
          aria-label={ariaBilingual(ui.backToTopics)}
        >
          <BilingualLines
            text={ui.backToTopics}
            enClassName="text-xl font-medium leading-snug sm:text-2xl"
            zhClassName="!mt-1 text-lg sm:text-xl"
            gapClassName="mt-0.5"
          />
        </Link>
      </header>
      <main>
        <TopicVideoSection topic={topic} simpleMode={simpleMode} />
      </main>
    </div>
  );
}
