"use client";

import { motion } from "framer-motion";

export default function UseCasesSection() {
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

  const useCases = [
    {
      title: "Weddings & Celebrations",
      description:
        "Guests sign your wall, leaving notes and wishes. A living memory of your special day.",
    },
    {
      title: "Memorials & Tributes",
      description:
        "Preserve remembrances of loved ones. Share stories and memories with the community.",
    },
    {
      title: "Team & Company",
      description:
        "Celebrate milestones, departures, and achievements. Build company culture permanently.",
    },
    {
      title: "Classes & Graduations",
      description:
        "Capture the essence of a graduating class. Revisit memories years later with friends.",
    },
    {
      title: "Family Archives",
      description:
        "Create lasting digital records of family moments. A legacy for future generations.",
    },
    {
      title: "Community Events",
      description:
        "Festivals, fundraisers, meetups—capture the spirit of community in one place.",
    },
  ];

  return (
    <section className="relative z-10 py-24 px-4 bg-stone-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Designed for Every Moment
          </h2>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto">
            Whether celebrating, remembering, or building community—Echo Sign
            is your archive.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {useCases.map((useCase, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-8 border border-stone-700 rounded-lg hover:border-amber-700 hover:bg-stone-800 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                {useCase.title}
              </h3>
              <p className="text-stone-300">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
