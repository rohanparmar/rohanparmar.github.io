"use client";

import { motion, useReducedMotion } from "framer-motion";

// Scroll-reveal wrapper: one gentle rise per section, disabled under reduced motion.
const Reveal = ({ children }: { children: React.ReactNode }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
