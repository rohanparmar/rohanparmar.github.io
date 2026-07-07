import { details } from "@/constants/site";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

// Projects as numbered detail callouts, drawing-sheet style.
const DetailViews = () => (
  <section id="builds" className="scroll-mt-10 pb-20 sm:pb-28">
    <Reveal>
      <SectionLabel>DETAIL VIEWS</SectionLabel>
    </Reveal>

    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {details.map((project, index) => (
        <Reveal key={project.title}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col border border-trace p-7 transition-colors hover:border-paper/70 hover:bg-white/[0.04] sm:p-8"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-label text-mist">
                DETAIL {index + 1}
              </span>
              <span className="font-mono text-[11px] tracking-label text-mist transition-colors group-hover:text-paper">
                SOURCE ↗
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl font-semibold uppercase leading-tight tracking-wide text-paper sm:text-[26px]">
              {project.title}
            </h3>
            <p className="mt-3 leading-relaxed text-mist">{project.description}</p>

            <p className="mt-auto pt-6 font-mono text-[11px] leading-relaxed tracking-wide text-mist">
              <span className="mr-2 text-paper">MATERIALS:</span>
              {project.materials.join(" · ")}
            </p>
          </a>
        </Reveal>
      ))}
    </div>
  </section>
);

export default DetailViews;
