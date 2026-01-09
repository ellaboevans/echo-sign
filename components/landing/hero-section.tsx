"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        className="max-w-4xl text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-block">
          <span className="px-6 py-2.5 border bg-amber-500/40 border-amber-200 text-amber-900 text-xs font-semibold tracking-wider rounded-full  hover:border-amber-300 transition-colors">
            PRESERVE MEMORIES. BUILD LEGACIES.
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl font-display font-bold text-stone-900 leading-tight"
        >
          Every Signature Tells a Story
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-stone-600 font-serif italic max-w-2xl mx-auto"
        >
          Create digital signature walls where communities, families, and
          colleagues leave their mark. Preserve memories that matter. Build
          legacies that last.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Link
            href="/onboarding"
            className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 active:scale-95"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-white text-stone-900 font-bold uppercase tracking-widest rounded-lg border-2 border-stone-200 hover:border-amber-700 hover:text-amber-700 transition-all"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Trust Signal */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-stone-500 pt-4"
        >
          No credit card required. Create your first wall in seconds.
        </motion.p>
      </motion.div>
    </section>
  );
}
