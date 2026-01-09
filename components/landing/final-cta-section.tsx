"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCtaSection() {
  return (
    <section className="relative z-10 py-24 px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900">
          Ready to Create Your Legacy?
        </h2>
        <p className="text-lg text-stone-600">
          Join communities building digital monuments to moments that matter.
          Your first wall awaits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/onboarding"
            className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 active:scale-95"
          >
            Create Your Wall Now
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-stone-100 text-stone-900 font-bold uppercase tracking-widest rounded-lg hover:bg-stone-200 transition-all"
          >
            Already Have an Account?
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
