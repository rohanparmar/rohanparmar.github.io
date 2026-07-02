"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteMeta } from "@/constants/site";

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
      className="pb-20 pt-16 sm:pb-28 sm:pt-24"
    >
      <motion.p
        variants={rise}
        className="flex items-center gap-2.5 font-mono text-[11px] tracking-label text-graphite"
      >
        <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-cobalt" />
        CURRENTLY BUILDING — GALILEO
      </motion.p>

      <h1 className="mt-8 font-display font-semibold uppercase leading-[0.88] tracking-tight text-ink">
        <motion.span variants={rise} className="block text-[clamp(4.5rem,15vw,11.5rem)]">
          Rohan
        </motion.span>
        <motion.span
          variants={rise}
          className="text-linework block text-[clamp(4.5rem,15vw,11.5rem)]"
        >
          Parmar
        </motion.span>
      </h1>

      {/* Dimension line: the "measurement" of the unit above */}
      <motion.div variants={rise} className="mt-10 max-w-[640px]" aria-hidden>
        <div className="relative flex items-center">
          <span className="h-3 w-px bg-cobalt" />
          <span className="h-px flex-1 bg-cobalt" />
          <span className="bg-paper px-3 font-mono text-[11px] tracking-label text-cobalt">
            SOFTWARE ENGINEER — ML SYSTEMS + FULL STACK
          </span>
          <span className="h-px flex-1 bg-cobalt" />
          <span className="h-3 w-px bg-cobalt" />
        </div>
      </motion.div>

      <div className="mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end">
        <div className="max-w-[560px]">
          <motion.p variants={rise} className="text-lg leading-relaxed text-graphite">
            I build machine-learning systems and the full-stack products around
            them. Co-founder at{" "}
            <span className="font-medium text-ink">Galileo</span>, an academic
            workspace with AI agents. Computer science at Simon Fraser
            University; previously at Workday and PayAmigo.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#builds"
              className="bg-cobalt px-6 py-3 font-mono text-[11px] tracking-label text-paper transition-colors hover:bg-cobalt-deep"
            >
              VIEW DETAILS ↓
            </a>
            <a
              href={siteMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink px-6 py-3 font-mono text-[11px] tracking-label text-ink transition-colors hover:border-cobalt hover:text-cobalt"
            >
              GITHUB ↗
            </a>
          </motion.div>
        </div>

        {/* Title block */}
        <motion.dl
          variants={rise}
          className="w-full max-w-[320px] border border-ink bg-paper"
        >
          {titleBlock.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[88px_1fr] border-b border-hairline last:border-b-0"
            >
              <dt className="border-r border-hairline px-3 py-2 font-mono text-[10px] tracking-label text-graphite">
                {row.label}
              </dt>
              <dd className="px-3 py-2 font-mono text-[11px] font-medium tracking-wide text-ink">
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
