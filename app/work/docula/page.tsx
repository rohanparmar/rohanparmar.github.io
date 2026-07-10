import type { Metadata } from "next";
import { ArticleShell } from "@/components/article-shell";
import { siteMeta, sourceLinks } from "@/constants/site";

export const metadata: Metadata = {
  title: "Docula case study",
  description:
    "How a three-person team took a medical-billing AI system from a Gemini notebook to production—and into an acquisition by Mecka.",
  alternates: {
    canonical: "/work/docula/",
  },
};

const facts = [
  ["Role", "Co-founder · Product & engineering"],
  ["Team", "Three people · Bootstrapped"],
  ["Years", "2025–2026"],
  ["Outcome", "Acquired by Mecka"],
];

export default function DoculaCaseStudy() {
  return (
    <ArticleShell
      eyebrow="Case study · Docula"
      title="From a notebook to production medical AI."
      deck="A three-person team built an end-to-end medical-billing engine, developed an evaluation practice around it, and joined Mecka through acquisition."
      meta="Product · Data systems · AI evaluation · 2025–2026"
      backHref="/"
      backLabel="Back home"
    >
      <section className="article-section" aria-labelledby="snapshot-heading">
        <p className="article-label eyebrow">Snapshot</p>
        <div>
          <h2 id="snapshot-heading" className="sr-only">
            Project snapshot
          </h2>
          <dl className="grid border-y border-rule sm:grid-cols-2">
            {facts.map(([term, detail], index) => (
              <div
                key={term}
                className={`py-5 sm:px-5 ${
                  index < 2 ? "border-b border-rule" : ""
                } ${index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"}`}
              >
                <dt className="font-sans text-[11px] uppercase tracking-[0.1em] text-muted">
                  {term}
                </dt>
                <dd className="mt-2 text-[18px]">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="article-section" aria-labelledby="problem-heading">
        <p className="article-label eyebrow">01 · Problem</p>
        <div className="article-copy">
          <h2 id="problem-heading" className="!mt-0">
            The expensive part was not one prediction. It was the whole workflow.
          </h2>
          <p>
            Medical expert witnesses and legal consultants work through large,
            inconsistent records before they can audit a bill or defend a report.
            The job crosses documents, billing codes, edits, fee benchmarks, and
            professional judgment. Automating only one step still leaves the user
            stitching the rest together.
          </p>
          <p>
            Docula was built as the connective system: ingest the source material,
            turn it into structured work, apply domain rules, and return something
            a professional could inspect and use.
          </p>
        </div>
      </section>

      <section className="article-section" aria-labelledby="system-heading">
        <p className="article-label eyebrow">02 · System</p>
        <div>
          <div className="article-copy">
            <h2 id="system-heading" className="!mt-0">
              Medical records in. Defensible reports out.
            </h2>
            <p>
              The product handled the workflow end to end: ingest records,
              normalize billing codes, run edits, benchmark fees, and produce a
              report. The model sat inside a larger data and product system; it was
              never the entire product.
            </p>
          </div>

          <ol className="mt-10 grid border-y border-rule font-sans text-[13px] sm:grid-cols-5 sm:divide-x sm:divide-rule">
            {[
              "Ingest",
              "Normalize",
              "Validate",
              "Benchmark",
              "Report",
            ].map((step, index) => (
              <li
                key={step}
                className="border-b border-rule py-4 last:border-b-0 sm:border-b-0 sm:px-4 sm:first:pl-0 sm:last:pr-0"
              >
                <span className="block text-[10px] text-muted">0{index + 1}</span>
                <span className="mt-2 block">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="article-section" aria-labelledby="evals-heading">
        <p className="article-label eyebrow">03 · Evals</p>
        <div className="article-copy">
          <h2 id="evals-heading" className="!mt-0">
            Production quality required a measurement system.
          </h2>
          <p>
            My focus was moving the core workflow from a Gemini notebook into a
            reliable product. That meant obtaining golden data, breaking the broad
            task into observable subproblems, incorporating domain-expert feedback,
            and making failures legible enough to fix.
          </p>
          <blockquote>
            A demo answers “can this work once?” Evals answer “is the system getting
            better?”
          </blockquote>
          <p>
            The useful unit was not a single model score. It was a chain of checks
            around the workflow—enough context to know where quality moved and why.
          </p>
          <p>
            This engineering journey became my first public talk, at Vancouver.dev’s
            event on agentic AI evaluation and benchmarks.
          </p>
        </div>
      </section>

      <section className="article-section" aria-labelledby="outcome-heading">
        <p className="article-label eyebrow">04 · Outcome</p>
        <div>
          <div className="article-copy">
            <h2 id="outcome-heading" className="!mt-0">
              Faster work, then an acquisition.
            </h2>
            <p>
              In 2025, I reported that one customer’s case-processing workflow fell
              from roughly 100 hours to five minutes, and that the customer’s
              revenue doubled. Those figures are a founder-reported customer result,
              not an independently audited benchmark.
            </p>
            <p>
              In early 2026, Mecka acquired Docula. The full three-person team joined
              Mecka, where the scale shifted from medical records to the human-motion
              data used to train physical-AI systems.
            </p>
          </div>

          <div className="mt-10 grid border-y border-rule sm:grid-cols-3 sm:divide-x sm:divide-rule">
            <div className="py-5 sm:pr-5">
              <p className="text-[35px] font-medium leading-none">100h → 5m</p>
              <p className="mt-3 font-sans text-[12px] text-muted">Founder-reported client workflow</p>
            </div>
            <div className="border-t border-rule py-5 sm:border-t-0 sm:px-5">
              <p className="text-[35px] font-medium leading-none">3</p>
              <p className="mt-3 font-sans text-[12px] text-muted">Bootstrapped founders</p>
            </div>
            <div className="border-t border-rule py-5 sm:border-t-0 sm:pl-5">
              <p className="text-[35px] font-medium leading-none">2026</p>
              <p className="mt-3 font-sans text-[12px] text-muted">Acquired by Mecka</p>
            </div>
          </div>
        </div>
      </section>

      <section className="article-section" aria-labelledby="sources-heading">
        <p className="article-label eyebrow">Sources</p>
        <div>
          <h2 id="sources-heading" className="sr-only">
            Sources and further reading
          </h2>
          <ul className="border-b border-rule">
            {[
              {
                label: "Independent acquisition coverage",
                source: "BetaKit · 2026",
                href: sourceLinks.acquisition,
              },
              {
                label: "Agentic AI: Evals & Benchmarks",
                source: "Vancouver.dev · 2025",
                href: sourceLinks.talk,
              },
              {
                label: "Attendee recap of the production-AI talk",
                source: "Toby Tobkin · 2025",
                href: sourceLinks.talkRecap,
              },
              {
                label: "Founder-reported customer result",
                source: "Rohan Parmar · 2025",
                href: sourceLinks.founderResult,
              },
              {
                label: "Docula product",
                source: "Docula",
                href: siteMeta.docula,
              },
            ].map((item) => (
              <li key={item.label} className="border-t border-rule">
                <a
                  className="grid min-h-20 items-center gap-2 py-4 no-underline sm:grid-cols-[1fr_auto]"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-[17px]">{item.label}</span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.09em] text-muted">
                    {item.source} ↗
                  </span>
                  <span className="sr-only">Opens in a new tab</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ArticleShell>
  );
}
