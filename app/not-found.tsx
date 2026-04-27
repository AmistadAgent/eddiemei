import Link from "next/link";
import { ui } from "@/lib/i18n";
import { BilingualLines } from "@/components/BilingualLines";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60dvh] w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <BilingualLines
        text={ui.notFoundTitle}
        enClassName="font-serif text-3xl text-[--ink] sm:text-4xl"
        zhClassName="!mt-2 text-2xl sm:text-3xl"
        gapClassName="mt-2"
      />
      <BilingualLines
        text={ui.notFoundBody}
        enClassName="text-xl text-[--ink-muted] sm:text-2xl"
        zhClassName="!mt-2 text-lg sm:text-xl"
        gapClassName="mt-2"
      />
      <Link
        href="/"
        className="inline-flex min-h-[56px] min-w-[220px] flex-col items-center justify-center rounded-2xl border-2 border-[--ink-soft] bg-white px-6 py-3 text-center text-[--ink] shadow-sm"
      >
        <BilingualLines
          text={ui.notFoundCta}
          enClassName="text-2xl font-medium"
          zhClassName="!mt-1 text-xl"
          gapClassName="mt-1"
        />
      </Link>
    </main>
  );
}
