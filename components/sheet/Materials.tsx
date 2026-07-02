import { materials } from "@/constants/site";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

// Skills as a materials-and-finishes specification.
const Materials = () => (
  <section id="materials" className="scroll-mt-10 pb-20 sm:pb-28">
    <Reveal>
      <SectionLabel>MATERIALS + FINISHES</SectionLabel>
    </Reveal>

    <Reveal>
      <dl>
        {materials.map((row) => (
          <div
            key={row.label}
            className="grid gap-x-8 gap-y-1 border-b border-hairline py-5 sm:grid-cols-[200px_1fr]"
          >
            <dt className="font-mono text-[11px] leading-6 tracking-label text-graphite">
              {row.label}
            </dt>
            <dd className="flex flex-wrap gap-x-7 gap-y-1 font-medium text-ink">
              {row.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  </section>
);

export default Materials;
