"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteMeta } from "@/constants/site";
import { PlottedWord } from "./Plotted";

const titleBlock = [
  { label: "UNIT", value: siteMeta.shortName },
  { label: "TITLE", value: siteMeta.title },
  { label: "DWG NO.", value: `${siteMeta.drawingNo} · REV ${siteMeta.revision}` },
  { label: "LOCATION", value: siteMeta.location },
  { label: "SCALE", value: "1:1" },
  { label: "SHEET", value: "1 OF 1" },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id="top"
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      transition={{ staggerChildren: 0.07 }}
      className="relative pb-20 pt-16 sm:pb-28 sm:pt-24"
    >
      {/* Soft print-exposure glow behind the name */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[480px] bg-[radial-gradient(60%_60%_at_40%_35%,rgba(126,158,255,0.30),transparent_70%)]"
      />

      <motion.p
        variants={rise}
        className="relative flex items-center gap-2.5 font-mono text-[11px] tracking-label text-mist"
      >
        <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-paper" />
        CURRENTLY — MECKA AI, THE DATA LAYER FOR ROBOTICS
      </motion.p>

      <h1 className="relative mt-10">
        <span className="sr-only">Rohan Parmar</span>
        <PlottedWord
          word="ROHAN"
          className="gap-[0.06em] text-[clamp(3.8rem,13.5vw,11rem)] text-paper"
        />
        <PlottedWord
          word="PARMAR"
          delayOffset={5}
          className="mt-[0.14em] gap-[0.06em] text-[clamp(3.8rem,13.5vw,11rem)] text-paper opacity-60"
        />
      </h1>

      {/* Dimension line: the "measurement" of the unit above */}
      <motion.div variants={rise} className="relative mt-12 max-w-[640px]" aria-hidden>
        <div className="flex items-center text-paper/80">
          <span className="h-3 w-px bg-current" />
          <span className="h-px flex-1 bg-current" />
          <span className="px-3 font-mono text-[11px] tracking-label text-mist">
            SOFTWARE ENGINEER — ML SYSTEMS + FULL STACK
          </span>
          <span className="h-px flex-1 bg-current" />
          <span className="h-3 w-px bg-current" />
        </div>
      </motion.div>

      <div className="relative mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end">
        <div className="max-w-[560px]">
          <motion.p variants={rise} className="text-lg leading-relaxed text-mist">
            I build machine-learning systems and the full-stack products around
            them. Co-founded <span className="font-medium text-paper">Docula</span>{" "}
            — generative AI for medical billing — bootstrapped it with a
            three-person team, and sold it to{" "}
            <span className="font-medium text-paper">Mecka AI</span> in 2026.
            Now processing the motion data that teaches robots to move.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#builds"
              className="bg-paper px-6 py-3 font-mono text-[11px] tracking-label text-field transition-colors hover:bg-white"
            >
              VIEW DETAILS ↓
            </a>
            <a
              href={siteMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-trace px-6 py-3 font-mono text-[11px] tracking-label text-paper transition-colors hover:border-paper"
            >
              GITHUB ↗
            </a>
          </motion.div>
        </div>

        {/* Title block */}
        <motion.dl variants={rise} className="w-full max-w-[320px] border border-paper/60">
          {titleBlock.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[88px_1fr] border-b border-trace last:border-b-0"
            >
              <dt className="border-r border-trace px-3 py-2 font-mono text-[10px] tracking-label text-mist">
                {row.label}
              </dt>
              <dd className="px-3 py-2 font-mono text-[11px] font-medium tracking-wide text-paper">
                {row.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </motion.section>
  );
};

export default Hero;
