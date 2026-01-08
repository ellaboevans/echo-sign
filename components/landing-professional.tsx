"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GridBackground from "./grid-background";

export default function LandingProfessional() {
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

  const slideInVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50">
      <GridBackground />
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          className="max-w-4xl text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-6 py-2.5 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wider rounded-full bg-gradient-to-r from-amber-50/50 to-transparent hover:border-amber-300 transition-colors">
              PRESERVE MEMORIES. BUILD LEGACIES.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-display font-bold text-stone-900 leading-tight">
            Every Signature Tells a Story
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-stone-600 font-serif italic max-w-2xl mx-auto">
            Create digital signature walls where communities, families, and
            colleagues leave their mark. Preserve memories that matter. Build
            legacies that last.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/onboarding"
              className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 active:scale-95">
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-stone-900 font-bold uppercase tracking-widest rounded-lg border-2 border-stone-200 hover:border-amber-700 hover:text-amber-700 transition-all">
              Sign In
            </Link>
          </motion.div>

          {/* Trust Signal */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-stone-500 pt-4">
            No credit card required. Create your first wall in seconds.
          </motion.p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
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
            viewport={{ once: true }}>
            {[
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
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 bg-stone-50 rounded-lg hover:shadow-lg transition-shadow">
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

      {/* How It Works Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900">
              How It Works
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Get started in minutes. No technical knowledge required.
            </p>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {[
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
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={slideInVariants}
                className="flex gap-8 items-start">
                <div className="flex-shrink-0">
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

      {/* Use Cases Section */}
      <section className="relative z-10 py-24 px-4 bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
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
            viewport={{ once: true }}>
            {[
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
            ].map((useCase, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 border border-stone-700 rounded-lg hover:border-amber-700 hover:bg-stone-800 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-stone-300">{useCase.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900">
              Built on Principles
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {[
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
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center p-8">
                <h3 className="text-2xl font-bold text-stone-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-stone-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
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
              className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 active:scale-95">
              Create Your Wall Now
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-stone-100 text-stone-900 font-bold uppercase tracking-widest rounded-lg hover:bg-stone-200 transition-all">
              Already Have an Account?
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-200 bg-stone-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                Echo Sign
              </h3>
              <p className="text-stone-600 text-sm">
                Preserving memories, building legacies, one signature at a time.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-700 transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-200 pt-8 text-center text-sm text-stone-500">
            <p>© 2026 Echo Sign. Made with care for memories that matter.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
