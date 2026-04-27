"use client";

import { ui } from "@/lib/i18n";
import { useMemorial } from "./MemorialProviders";
import { ariaBilingual, BilingualLines } from "./BilingualLines";

/** Top bar: simple mode only. English + 中文 on the same page (no language toggle). */
export function SiteControls() {
  const { simpleMode, toggleSimpleMode } = useMemorial();
  const label = simpleMode ? ui.simpleModeOff : ui.simpleMode;

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4 print:hidden">
      <button
        type="button"
        onClick={toggleSimpleMode}
        className="min-h-[56px] min-w-[min(100%,240px)] rounded-xl border-2 border-[--ink-soft] bg-white/60 px-5 py-2 text-center text-[--ink] shadow-sm transition focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[--accent] sm:min-w-[280px] sm:py-3 sm:text-lg"
        aria-label={ariaBilingual(label)}
      >
        <BilingualLines
          text={label}
          gapClassName="mt-1"
          enClassName="font-medium leading-tight"
          zhClassName="text-base text-[--ink-muted] sm:text-lg"
        />
      </button>
    </div>
  );
}
