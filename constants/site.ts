export const siteMeta = {
  name: "Rohan Parmar",
  title: "Rohan Parmar",
  description:
    "Rohan Parmar builds systems and companies. He co-founded Docula, acquired by Mecka in 2026.",
  url: "https://rohanparmar.com",
  email: "rohanparmar@getdocula.com",
  github: "https://github.com/rohanparmar",
  linkedin: "https://www.linkedin.com/in/rohanxparmar",
  mecka: "https://www.mecka.ai/",
  docula: "https://getdocula.com/",
} as const;

export const sourceLinks = {
  acquisition:
    "https://betakit.com/mecka-ai-acquires-docula-as-it-builds-the-data-layer-for-robotics/",
  founderProfile:
    "https://thelogic.co/news/the-big-read/vancouver-tech-scene-community-founders/",
  talk: "https://luma.com/vandevirl9",
  talkRecap:
    "https://www.linkedin.com/posts/tobytobkin_my-favorite-insights-from-evals-benchmarks-activity-7377560307336065024-ULZV",
  founderResult: "https://www.linkedin.com/in/rohanxparmar",
} as const;

export interface PublicationItem {
  title: string;
  detail: string;
  href?: string;
}

export const publications: PublicationItem[] = [
  {
    title: "Mecka AI acquires Docula",
    detail: "BetaKit · June 29, 2026",
    href: sourceLinks.acquisition,
  },
  {
    title: "Young founders are trying to revive Vancouver’s dying startup scene",
    detail: "The Logic · November 7, 2025",
    href: sourceLinks.founderProfile,
  },
  {
    title: "A practical case study in shipping medical AI",
    detail: "Toby Tobkin · September 26, 2025",
    href: sourceLinks.talkRecap,
  },
  {
    title: "Agentic AI: Evals & Benchmarks",
    detail: "Vancouver.dev · September 25, 2025",
    href: sourceLinks.talk,
  },
  {
    title: "Spyyder",
    detail: "Patent pending; product sold in 2020",
  },
];

export interface WorkItem {
  period: string;
  company: string;
  line: string;
  href?: string;
}

export const work: WorkItem[] = [
  {
    period: "2026—",
    company: "Mecka",
    line: "Software engineer.",
    href: siteMeta.mecka,
  },
  {
    period: "2025–26",
    company: "Docula",
    line: "Co-founder. Acquired by Mecka.",
    href: "/work/docula/",
  },
  {
    period: "2024–25",
    company: "Galileo",
    line: "Co-founder.",
  },
  {
    period: "2024",
    company: "PayAmigo",
    line: "ML operations.",
  },
  {
    period: "2023",
    company: "Workday",
    line: "Software engineering.",
    href: "https://www.workday.com/",
  },
];
