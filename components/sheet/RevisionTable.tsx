import { revisions } from "@/constants/site";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { PlottedLetter } from "./Plotted";

// Work experience as the drawing's revision history: REV A → C in reverse order.
const RevisionTable = () => (
  <section id="work" className="scroll-mt-10 pb-20 sm:pb-28">
    <Reveal>
      <SectionLabel>REVISION HISTORY</SectionLabel>
    </Reveal>

    <div>
      {revisions.map((item) => (
        <Reveal key={item.rev}>
          <article className="grid grid-cols-[48px_1fr] gap-x-5 border-b border-trace py-10 sm:grid-cols-[80px_1fr_200px] sm:gap-x-8">
            <PlottedLetter
              char={item.rev}
              className={`h-12 sm:h-14 ${
                item.status === "IN PROGRESS" ? "text-paper" : "text-paper/45"
              }`}
            />

            <div>
              <h3 className="font-display text-2xl font-semibold uppercase leading-tight tracking-wide text-paper sm:text-3xl">
                {item.company}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-label text-mist">
                {item.role.toUpperCase()}
              </p>
              <ul className="mt-5 max-w-[620px] space-y-2.5">
                {item.notes.map((note) => (
                  <li key={note} className="flex gap-3 leading-relaxed text-mist">
                    <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-paper/60" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-start-2 mt-6 flex flex-row flex-wrap items-center gap-x-5 gap-y-3 sm:col-start-3 sm:mt-1 sm:flex-col sm:items-end sm:gap-2.5">
              <p className="font-mono text-[11px] tracking-label text-paper">{item.date}</p>
              <p className="font-mono text-[11px] tracking-label text-mist">
                {item.location}
              </p>
              {item.status === "RELEASED" ? (
                <p className="font-mono text-[10px] tracking-label text-mist">
                  {item.status}
                </p>
              ) : (
                <p className="stamp px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-label">
                  {item.status}
                </p>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default RevisionTable;
