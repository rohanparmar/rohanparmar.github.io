// Hand-drafted single-stroke lettering, in the tradition of plotter pens and
// Leroy lettering guides. Each glyph is one SVG path on a 72×116 grid
// (cap top y=8, baseline y=108); subpaths draw in pen-stroke order.
const GLYPHS: Record<string, string> = {
  R: "M10 108 L10 8 L40 8 Q62 8 62 31 Q62 54 40 54 L10 54 M42 54 L62 108",
  O: "M36 8 Q10 8 10 58 Q10 108 36 108 Q62 108 62 58 Q62 8 36 8 Z",
  H: "M10 8 L10 108 M62 8 L62 108 M10 58 L62 58",
  A: "M6 108 L36 8 L66 108 M17 72 L55 72",
  N: "M10 108 L10 8 L62 108 L62 8",
  P: "M10 108 L10 8 L40 8 Q62 8 62 32 Q62 56 40 56 L10 56",
  M: "M8 108 L8 8 L36 62 L64 8 L64 108",
  B: "M10 108 L10 8 L38 8 Q58 8 58 30 Q58 52 38 52 L10 52 M38 52 Q62 52 62 80 Q62 108 38 108 L10 108",
  C: "M62 26 Q54 8 36 8 Q10 8 10 58 Q10 108 36 108 Q54 108 62 90",
  D: "M10 108 L10 8 L32 8 Q62 8 62 58 Q62 108 32 108 L10 108",
  E: "M62 8 L10 8 L10 108 L62 108 M10 58 L52 58",
};

interface PlottedWordProps {
  word: string;
  /** Stagger offset so a second row starts after the first finishes */
  delayOffset?: number;
  className?: string;
}

// A row of plotted letters that draw themselves in (CSS handles the animation
// and the reduced-motion fallback to a finished drawing).
export const PlottedWord = ({ word, delayOffset = 0, className = "" }: PlottedWordProps) => (
  <span aria-hidden className={`plot-draw flex ${className}`}>
    {word.split("").map((char, i) => (
      <svg
        key={`${char}-${i}`}
        viewBox="0 0 72 116"
        className="h-[1em] w-auto"
        style={{ "--i": delayOffset + i } as React.CSSProperties}
      >
        <path className="plot-path" pathLength={1} d={GLYPHS[char]} />
      </svg>
    ))}
  </span>
);

// A single static glyph (already inked — no draw animation).
export const PlottedLetter = ({ char, className = "" }: { char: string; className?: string }) => (
  <svg aria-hidden viewBox="0 0 72 116" className={`w-auto ${className}`}>
    <path className="plot-path" pathLength={1} d={GLYPHS[char]} />
  </svg>
);
