import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  publications,
  siteMeta,
  work,
} from "@/constants/site";

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-20 pt-14">
    <h2 className="text-[17px] italic text-muted">{title}</h2>
    <div className="mt-5">{children}</div>
  </section>
);

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-[41rem] px-6 pb-20 pt-12 text-[17.5px] leading-[1.65] sm:pt-20"
      >
        <h1 className="text-[32px] font-medium leading-tight">Rohan Parmar</h1>

        <div className="mt-9 space-y-5">
          <p className="text-[21px] leading-[1.5]">I build systems and companies.</p>
          <p>
            I started building in my teens.{" "}
            <span className="font-medium">Spyyder</span>, a patent-pending smart
            convertible hub, sold in 2020.
          </p>
          <p>
            I co-founded{" "}
            <a href={siteMeta.docula} target="_blank" rel="noreferrer">
              Docula
            </a>
            {" "}in 2025. Three of us bootstrapped the company;{" "}
            <a href={siteMeta.mecka} target="_blank" rel="noreferrer">
              Mecka
            </a>{" "}
            acquired it in 2026, and I joined as an engineer.
          </p>
          <p>Computer science at Simon Fraser University.</p>
        </div>

        <Section id="journey" title="Journey">
          <ol className="space-y-4">
            {work.map((item) => (
              <li
                key={`${item.period}-${item.company}`}
                className="grid gap-x-6 sm:grid-cols-[76px_1fr]"
              >
                <span className="text-[15px] leading-[1.8] text-muted [font-variant-numeric:tabular-nums]">
                  {item.period}
                </span>
                <span>
                  <span className="font-medium">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                    .
                  </span>{" "}
                  {item.line}
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="publications" title="Publications">
          <ul className="space-y-3">
            {publications.map((publication) => (
              <li key={publication.title}>
                {publication.href ? (
                  <a href={publication.href} target="_blank" rel="noreferrer">
                    {publication.title}
                  </a>
                ) : (
                  <span className="font-medium">{publication.title}</span>
                )}{" "}
                <span className="text-[15px] text-muted">
                  — {publication.detail}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
