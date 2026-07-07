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
    line: "Data platform for robotics — normalizing 3D human-motion data collected across 12 countries.",
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

export interface Project {
  title: string;
  line: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "In-memory time-series database",
    line: "Modern C++ — columnar storage, parallel compression, lock-free ingestion.",
    link: "https://github.com/rohanparmar/tsdb",
  },
  {
    title: "The Gem in I",
    line: "Conversational language practice on Gemini, with real-time speech in and out.",
    link: "https://github.com/rohanparmar/gem-in-i",
  },
  {
    title: "Duplicate-issue detection for GitHub",
    line: "Document-level SBERT embeddings; evaluated on F1, cross-entropy, ROC-AUC.",
    link: "https://github.com/rohanparmar/Document-Level-Embeddings-for-Github-Duplicate-Issues-Detection",
  },
  {
    title: "EnounceAI",
    line: "English-semantics tutor for immigrants — GPT-3 generates material, BERT scores it.",
    link: "https://github.com/rohanparmar/enounceai",
  },
];
