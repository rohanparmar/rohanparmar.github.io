import { siteMeta, work } from "@/constants/site";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-14">
    <h2 className="text-[17px] italic text-muted">{title}</h2>
    <div className="mt-5">{children}</div>
  </section>
);

export default function Home() {
  return (
    <main className="mx-auto max-w-[41rem] px-6 pb-24 pt-20 text-[17.5px] leading-[1.65] sm:pt-28">
      <h1 className="text-[30px] font-medium leading-tight">Rohan Parmar</h1>
      <p className="mt-1 text-muted">Software engineer, Vancouver</p>

      <div className="mt-10 space-y-5">
        <p>
          I build machine-learning systems and the products around them. In 2025
          I co-founded <span className="font-medium">Docula</span>, a
          generative-AI engine for medical billing — we bootstrapped it with a
          team of three, and <span className="font-medium">Mecka AI</span>{" "}
          acquired it in 2026.
        </p>
        <p>
          I&apos;m now at Mecka, working on the data platform that turns human
          motion into training data for robots. Computer science at Simon
          Fraser University.
        </p>
      </div>

      <Section title="Work">
        <ul className="space-y-4">
          {work.map((item) => (
            <li key={item.company} className="grid gap-x-6 sm:grid-cols-[76px_1fr]">
              <span className="text-[15px] leading-[1.8] text-muted [font-variant-numeric:tabular-nums]">
                {item.period}
              </span>
              <span>
                <span className="font-medium">{item.company}.</span> {item.line}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <footer className="mt-16 flex flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-6 text-[16px]">
        <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
        <a href={siteMeta.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={siteMeta.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </footer>
    </main>
  );
}
