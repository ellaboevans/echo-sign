"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
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

  const features = [
    {
      icon: "✍️",
      title: "Beautiful Simplicity",
      description:
        "Intuitive signature drawing. Optional memories. No complexity. Just elegance.",
    },
    {
      icon: "🔒",
      title: "Your Control",
      description:
        "Choose who sees what. Public, private, or unlisted—you decide. Data stays yours.",
    },
    {
      icon: "🎨",
      title: "Brand It Your Way",
      description:
        "Custom colors, logos, cover images. Make your wall reflect your personality.",
    },
    {
      icon: "💫",
      title: "Preserve Forever",
      description:
        "Permanent digital archive. No likes, no comments—just authentic signatures.",
    },
    {
      icon: "🎯",
      title: "Multiple Walls",
      description:
        "One account, infinite possibilities. Weddings, memorials, graduations, teams.",
    },
    {
      icon: "🌍",
      title: "Global & Local",
      description:
        "Accessible anywhere, anytime. Whether in-person or remote, signatures flow in.",
    },
  ];

  return (
    <section className="relative z-10 py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900">
            Why Echo Sign
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Purpose-built for meaningful moments that deserve to be remembered
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx + 1}
              variants={itemVariants}
              className="p-8 bg-stone-50 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-stone-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
