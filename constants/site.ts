export const siteMeta = {
  name: "Rohan Parmar",
  shortName: "R. PARMAR",
  drawingNo: "RP-01",
  revision: "C",
  title: "SOFTWARE + ML SYSTEMS",
  location: "VANCOUVER, BC",
  email: "rohanparmar@getdocula.com",
  github: "https://github.com/rohanparmar",
  linkedin: "https://www.linkedin.com/in/rohanparmar",
};

export interface Revision {
  rev: string;
  company: string;
  role: string;
  date: string;
  location: string;
  status: "IN PROGRESS" | "RELEASED";
  notes: string[];
}

export const revisions: Revision[] = [
  {
    rev: "C",
    company: "Galileo",
    role: "Co-founder",
    date: "OCT 2024 — PRESENT",
    location: "VANCOUVER, BC",
    status: "IN PROGRESS",
    notes: [
      "Building an academic workspace with AI agents for course planning, exam generation, and concept podcasts.",
      "Next.js frontend, FastAPI backend; agents built with AutoGen and Pydantic, deployed on Modal for web inference.",
      "Supabase with pgvector for embeddings; interactions served through OpenRouter and LangChain, monitored with Langfuse.",
    ],
  },
  {
    rev: "B",
    company: "PayAmigo",
    role: "Machine Learning Operations Intern",
    date: "JUL — DEC 2024",
    location: "FLORIDA, USA",
    status: "RELEASED",
    notes: [
      "Implemented ETL pipelines with AWS S3, Glue, and Spark under Apache Airflow, refining terabytes of transaction data for ML.",
      "Deployed a custom Grafana plugin (React, Docker) that accelerated dashboard query analysis 25× for a team of 25 developers.",
      "Built high-performance dashboards with Next.js on AWS Amplify, streaming from RDS under thousands of concurrent requests.",
    ],
  },
  {
    rev: "A",
    company: "Workday",
    role: "Software Application Development Engineer Intern",
    date: "MAY — DEC 2023",
    location: "VANCOUVER, BC",
    status: "RELEASED",
    notes: [
      "Developed a Workday X2 extension (React, TypeScript) with proxy user switching — saving roughly 7,500 hours ($500K) annually.",
      "Cut page load times on high-usage financial assets by 90% (5 min → 30 s) by re-architecting key data views with Xpresso.",
      "Linked OMS metadata with JIRA in MySQL and used LLaMA to flag duplicate tickets.",
    ],
  },
];

export interface Detail {
  title: string;
  description: string;
  materials: string[];
  link: string;
}

export const details: Detail[] = [
  {
    title: "In-Memory Time-Series Database",
    description:
      "A concurrency-focused TSDB in modern C++ — columnar storage, parallel compression, and lock-free data structures for real-time ingestion and queries.",
    materials: ["C++", "Lock-free structures", "Columnar storage"],
    link: "https://github.com/rohanparmar/tsdb",
  },
  {
    title: "The Gem in I",
    description:
      "An interactive language-learning app built on Gemini with advanced TTS/STT, for real-time conversational practice.",
    materials: ["Angular", "Firebase", "Google Cloud", "ElevenLabs"],
    link: "https://github.com/rohanparmar/gem-in-i",
  },
  {
    title: "Duplicate-Issue Detection for GitHub",
    description:
      "An ML pipeline that catches duplicate GitHub issues with document-level SBERT embeddings, evaluated across F1, cross-entropy, and ROC-AUC.",
    materials: ["Python", "PyTorch", "SBERT", "NLP"],
    link: "https://github.com/rohanparmar/Document-Level-Embeddings-for-Github-Duplicate-Issues-Detection",
  },
  {
    title: "EnounceAI",
    description:
      "A web app that helps immigrants sharpen English semantics — GPT-3 generates learning material, BERT scores correctness.",
    materials: ["Express", "GPT-3", "BERT", "Heroku"],
    link: "https://github.com/rohanparmar/enounceai",
  },
];

export const materials: { label: string; items: string[] }[] = [
  {
    label: "LANGUAGES",
    items: ["TypeScript", "Python", "C++", "Go", "SQL"],
  },
  {
    label: "FRONTEND",
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "BACKEND + DATA",
    items: ["Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Supabase", "Prisma"],
  },
  {
    label: "ML",
    items: ["PyTorch", "SBERT", "LangChain", "AutoGen", "Langfuse"],
  },
  {
    label: "INFRA",
    items: ["AWS", "Docker", "Airflow", "Spark", "Modal", "Vercel"],
  },
];
