import { siteMeta } from "@/constants/site";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const notes = [
  { label: "INQUIRIES", value: siteMeta.email, href: `mailto:${siteMeta.email}` },
  { label: "SOURCE", value: "github.com/rohanparmar", href: siteMeta.github },
  { label: "PROFILE", value: "linkedin.com/in/rohanparmar", href: siteMeta.linkedin },
];

// General notes: sheet-standard numbered notes double as contact links.
const Notes = () => (
  <footer id="notes" className="scroll-mt-10 pb-16 sm:pb-20">
    <Reveal>
      <SectionLabel>GENERAL NOTES</SectionLabel>
    </Reveal>

    <Reveal>
      <ol className="mt-8 space-y-4">
        {notes.map((note, index) => (
          <li key={note.label} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-[11px] tracking-label text-mist">
              {index + 1}. {note.label}
            </span>
            <a
              href={note.href}
              {...(note.href.startsWith("mailto:")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="font-mono text-sm text-paper underline-offset-4 transition-colors hover:underline"
            >
              {note.value}
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-trace pt-6">
        <p className="font-mono text-[10px] tracking-label text-mist">
          © 2026 {siteMeta.shortName} — ALL DIMENSIONS IN PIXELS UNLESS OTHERWISE NOTED
        </p>
        <p className="font-mono text-[10px] tracking-label text-mist">
          REV {siteMeta.revision} · PRINTED 2026
        </p>
      </div>
    </Reveal>
  </footer>
);

export default Notes;
