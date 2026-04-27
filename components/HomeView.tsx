"use client";

import Image from "next/image";
import { topics } from "@/data/topics";
import { HERO_IMAGE_ALT, HERO_IMAGE_URL, HIGHLIGHTS_REEL_URL } from "@/data/site";
import { ui } from "@/lib/i18n";
import { useMemorial } from "./MemorialProviders";
import { ariaBilingual, BilingualLines } from "./BilingualLines";
import { TopicCard } from "./TopicCard";

function scrollToTopics() {
  const el = document.getElementById("memory-topics");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ChooseAndNavigateRow({ withHeadphones }: { withHeadphones: boolean }) {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-6 sm:gap-7 lg:flex-row lg:items-start lg:gap-10">
      <div className="min-w-0 flex-1">
        <BilingualLines
          text={ui.chooseTopic}
          enClassName="text-2xl font-medium text-[#1c1916] sm:text-3xl"
          zhClassName="!mt-2 text-xl sm:text-2xl"
          gapClassName="mt-2"
        />
        {withHeadphones && (
          <div className="mt-2 sm:mt-3">
            <BilingualLines
              text={ui.headphones}
              enClassName="text-xl text-[#3d3832] sm:text-2xl"
              zhClassName="!mt-1 text-lg sm:text-xl"
              gapClassName="mt-1.5"
            />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 border-t border-[#2a1f18]/12 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <BilingualLines
          text={ui.topicsBelow}
          enClassName="text-base text-[#3d3832] sm:text-lg"
          zhClassName="!mt-1.5 text-sm sm:text-base"
          gapClassName="mt-1.5"
        />
        <button
          type="button"
          onClick={scrollToTopics}
          className="mt-3 min-h-[52px] w-full max-w-md rounded-2xl border-2 border-[#3a3028]/60 bg-white/80 px-5 py-2 text-left text-[#1a1614] shadow-sm transition [transition-property:box-shadow,transform] active:scale-[0.99] sm:mt-4"
          aria-label={ariaBilingual(ui.jumpToTopics)}
        >
          <BilingualLines
            text={ui.jumpToTopics}
            enClassName="text-lg font-medium sm:text-xl"
            zhClassName="!mt-0.5 text-base sm:text-lg"
            gapClassName="mt-0.5"
          />
        </button>
      </div>
    </div>
  );
}

function HomeReelVideo() {
  return (
    <div className="mt-6 w-full max-w-5xl sm:mt-8">
      <div className="overflow-hidden rounded-2xl border-2 border-[#2a1f18]/25 bg-[#0d0b09] shadow-lg ring-1 ring-[#0a0a0a]/20">
        <video
          className="max-h-[min(58dvh,520px)] w-full object-contain sm:max-h-[min(62dvh,580px)]"
          controls
          playsInline
          preload="metadata"
          aria-label={ariaBilingual(ui.reelVideoAria)}
        >
          <source src={HIGHLIGHTS_REEL_URL} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function HomeView() {
  const { simpleMode } = useMemorial();

  return (
    <div className="w-full max-w-5xl flex-col">
      <section
        className="relative left-1/2 w-screen min-h-[min(58vh,560px)] -translate-x-1/2 overflow-hidden sm:min-h-[min(62vh,640px)]"
        aria-labelledby="home-hero-title"
      >
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={HERO_IMAGE_URL}
            alt={HERO_IMAGE_ALT}
            fill
            className="object-cover object-right sm:object-[88%_48%]"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#f2ebe0]/[0.97] from-[0%] via-[#e8dfcf]/[0.88] via-[48%] to-[#0c0805]/[0.22] to-[100%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0604]/8 via-transparent to-[#0a0604]/25" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-0 px-5 pb-12 pt-8 text-left sm:px-10 sm:pb-14 sm:pt-10 md:max-w-6xl md:pl-12 md:pt-12">
          <h1
            id="home-hero-title"
            className="max-w-2xl font-serif text-4xl font-medium leading-[1.1] text-[#141210] [text-shadow:0_1px_2px_rgba(255,250,240,0.9)] sm:text-5xl md:text-6xl"
          >
            Eddie Mei
          </h1>
          {!simpleMode && (
            <div className="mt-3 max-w-xl [text-shadow:0_0_1px_rgba(255,250,240,0.8)] sm:mt-4">
              <BilingualLines
                text={ui.tagline}
                enClassName="text-2xl text-[#2a2724] sm:text-3xl"
                zhClassName="!mt-2 text-xl text-[#3d3832] sm:text-2xl"
                gapClassName="mt-2"
              />
            </div>
          )}
          {simpleMode && (
            <div className="mt-4 max-w-xl [text-shadow:0_0_1px_rgba(255,250,240,0.75)] sm:mt-5">
              <BilingualLines
                text={ui.guidedHint}
                enClassName="text-2xl leading-relaxed text-[#1c1916] sm:text-3xl"
                zhClassName="!mt-2 text-xl sm:text-2xl"
                gapClassName="mt-2"
              />
            </div>
          )}
          {!simpleMode && (
            <>
              <div className="mt-7 w-full sm:mt-9">
                <ChooseAndNavigateRow withHeadphones />
              </div>
              <HomeReelVideo />
            </>
          )}
          {simpleMode && (
            <>
              <HomeReelVideo />
              <div className="mt-5 w-full sm:mt-6">
                <ChooseAndNavigateRow withHeadphones={false} />
              </div>
            </>
          )}
        </div>
      </section>

      <div className="memorial-warm relative w-full max-w-5xl flex-col">
        <section
          id="memory-topics"
          className="scroll-mt-6 border-t border-[#dcd4c6]/60 bg-[--bg] px-4 pb-20 pt-10 sm:px-8"
          tabIndex={-1}
          aria-label={ariaBilingual(ui.chooseTopic)}
        >
          <h2 className="sr-only">
            {ui.chooseTopic.en} · {ui.chooseTopic.zh}
          </h2>
          <ul
            className="mx-auto flex max-w-4xl list-none flex-col gap-5 sm:gap-6"
            role="list"
          >
            {topics.map((topic) => (
              <li key={topic.slug} className="w-full" role="none">
                <TopicCard topic={topic} simpleMode={simpleMode} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
