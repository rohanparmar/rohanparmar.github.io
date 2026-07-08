export const siteMeta = {
  name: "Rohan Parmar",
  email: "rohanparmar@getdocula.com",
  github: "https://github.com/rohanparmar",
  linkedin: "https://www.linkedin.com/in/rohanparmar",
};

export interface WorkItem {
  period: string;
  company: string;
  line: string;
}

export const work: WorkItem[] = [
  {
    period: "2026–",
    company: "Mecka AI",
    line: "Engineer #7 — scaling human data for robotics.",
  },
  {
    period: "2025–26",
    company: "Docula",
    line: "Co-founder. Generative-AI engine for medical billing and auditing. Bootstrapped, three people; acquired by Mecka AI.",
  },
  {
    period: "2024–25",
    company: "Galileo",
    line: "Co-founder. Academic workspace with AI agents for course planning and exam generation.",
  },
  {
    period: "2024",
    company: "PayAmigo",
    line: "ML operations intern. ETL over terabytes of transaction data on AWS; Grafana tooling that sped query analysis 25×.",
  },
  {
    period: "2023",
    company: "Workday",
    line: "Software engineer intern. Built an X2 extension saving ~7,500 hours a year; cut key page loads by 90%.",
  },
];
