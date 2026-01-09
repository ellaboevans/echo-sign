"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const steps = [
    {
      step: "1",
      title: "Create Your Account",
      description:
        "Sign up with your name and choose a unique subdomain. That's your digital home.",
    },
    {
      step: "2",
      title: "Build Your Walls",
      description:
        "Create signature walls for different occasions—events, teams, memories, anything.",
    },
    {
      step: "3",
      title: "Share & Collect",
      description:
        "Share your wall's link. Guests draw signatures and leave optional memories.",
    },
    {
      step: "4",
      title: "Treasure Forever",
      description:
        "Every signature is permanently preserved. Watch your wall grow with memories.",
    },
  ];

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-6xl flex items-center flex-col  mx-auto">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900">
            How It Works
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Get started in minutes. No technical knowledge required.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8 grid-cols-2 grid gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              variants={slideInVariants}
              className="flex gap-8 items-start"
            >
              <div className="shrink-0">
                <div className="w-16 h-16 bg-amber-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-lg">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
