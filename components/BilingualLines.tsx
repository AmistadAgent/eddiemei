import type { Bilingual } from "@/lib/i18n";

type BilingualLinesProps = {
  text: Bilingual;
  className?: string;
  /** className for the English line */
  enClassName?: string;
  /** className for the 中文 line (muted by default) */
  zhClassName?: string;
  /** spacing between the two lines */
  gapClassName?: string;
};

/** English first, 繁體中文 second — same page, both visible */
export function BilingualLines({
  text,
  className = "",
  enClassName = "",
  zhClassName = "",
  gapClassName = "mt-1.5",
}: BilingualLinesProps) {
  return (
    <div className={className}>
      <p lang="en" className={enClassName}>
        {text.en}
      </p>
      <p lang="zh-Hant" className={`${gapClassName} text-[--ink-muted] ${zhClassName}`}>
        {text.zh}
      </p>
    </div>
  );
}

export function ariaBilingual(text: Bilingual): string {
  return `${text.en} · ${text.zh}`;
}
