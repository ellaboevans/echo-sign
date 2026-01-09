"use client";

import { motion } from "framer-motion";

export default function ValuesSection() {
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

  const values = [
    {
      title: "Authenticity",
      description:
        "Real signatures. Real stories. No engagement metrics. Just genuine moments.",
    },
    {
      title: "Permanence",
      description:
        "What you create stays forever (unless you delete it). Legacy-grade preservation.",
    },
    {
      title: "Privacy",
      description:
        "You choose who sees what. Control visibility. Build walls exactly how you want.",
    },
  ];

  return (
    <section className="relative z-10 py-24 px-4 bg-linear-to-br from-amber-50 to-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900">
            Built on Principles
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center p-8"
            >
              <h3 className="text-2xl font-bold text-stone-900 mb-3">
                {value.title}
              </h3>
              <p className="text-stone-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
