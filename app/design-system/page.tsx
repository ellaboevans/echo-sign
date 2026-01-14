"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Animation variants
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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        className="relative py-20 px-4 bg-stone-900 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-block mb-6 text-stone-400 hover:text-white transition">
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Design System
          </h1>
          <p className="text-lg text-stone-300 max-w-2xl">
            Comprehensive design tokens, components, and guidelines for Echo Sign. 
            Used to maintain consistency and quality across all digital experiences.
          </p>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto py-20 px-4 space-y-32">
        {/* COLOR PALETTE */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-display font-bold text-stone-900 mb-2">
              Color Palette
            </h2>
            <p className="text-lg text-stone-600">
              Heritage Dark theme with amber/gold accents
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Primary Colors */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-stone-900">Primary</h3>

              {[
                { name: "Amber 700", value: "#B45309", tailwind: "bg-amber-700" },
                { name: "Amber 800", value: "#92400E", tailwind: "bg-amber-800" },
              ].map((color) => (
                <motion.div
                  key={color.name}
                  variants={itemVariants}
                  className="flex items-center gap-4 cursor-pointer group"
                  onClick={() =>
                    copyToClipboard(color.value, color.name)
                  }
                >
                  <div
                    className={`w-16 h-16 rounded-lg ${color.tailwind} shadow-md group-hover:shadow-lg transition`}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-stone-900">{color.name}</p>
                    <p className="text-sm text-stone-600">{color.value}</p>
                    {copiedToken === color.name && (
                      <p className="text-xs text-amber-700">Copied!</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Neutral Colors */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-stone-900">Neutral</h3>

              {[
                { name: "Stone 50", value: "#FAFAF9", tailwind: "bg-stone-50" },
                { name: "Stone 600", value: "#57534E", tailwind: "bg-stone-600" },
                { name: "Stone 900", value: "#1C1917", tailwind: "bg-stone-900" },
              ].map((color) => (
                <motion.div
                  key={color.name}
                  variants={itemVariants}
                  className="flex items-center gap-4 cursor-pointer group"
                  onClick={() =>
                    copyToClipboard(color.value, color.name)
                  }
                >
                  <div
                    className={`w-16 h-16 rounded-lg ${color.tailwind} shadow-md border border-stone-200 group-hover:shadow-lg transition`}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-stone-900">{color.name}</p>
                    <p className="text-sm text-stone-600">{color.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Semantic Colors */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-stone-900">Semantic</h3>

              {[
                { name: "Success", value: "#10B981", tailwind: "bg-green-500" },
                { name: "Error", value: "#EF4444", tailwind: "bg-red-500" },
                { name: "Warning", value: "#F59E0B", tailwind: "bg-amber-400" },
              ].map((color) => (
                <motion.div
                  key={color.name}
                  variants={itemVariants}
                  className="flex items-center gap-4 cursor-pointer group"
                  onClick={() =>
                    copyToClipboard(color.value, color.name)
                  }
                >
                  <div
                    className={`w-16 h-16 rounded-lg ${color.tailwind} shadow-md group-hover:shadow-lg transition`}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-stone-900">{color.name}</p>
                    <p className="text-sm text-stone-600">{color.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* TYPOGRAPHY */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-display font-bold text-stone-900 mb-2">
              Typography
            </h2>
            <p className="text-lg text-stone-600">
              Font families and size scales
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            {/* Font Families */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 mb-6">Font Families</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-stone-600 mb-2">Display</p>
                  <p className="text-3xl font-display text-stone-900">
                    Playfair Display
                  </p>
                </div>
                <div>
                  <p className="text-sm text-stone-600 mb-2">Serif</p>
                  <p className="text-2xl font-serif text-stone-900">
                    Instrument Serif
                  </p>
                </div>
                <div>
                  <p className="text-sm text-stone-600 mb-2">Sans (UI)</p>
                  <p className="text-2xl font-sans text-stone-900">
                    Geist Sans
                  </p>
                </div>
                <div>
                  <p className="text-sm text-stone-600 mb-2">Mono</p>
                  <p className="text-lg font-mono text-stone-900">
                    Geist Mono
                  </p>
                </div>
              </div>
            </div>

            {/* Size Scale */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 mb-6">Size Scale</h3>
              <div className="space-y-4">
                {[
                  { size: "text-xs", label: "XS (12px)", example: "Labels, hints" },
                  { size: "text-sm", label: "SM (14px)", example: "Body text" },
                  { size: "text-base", label: "Base (16px)", example: "Default" },
                  { size: "text-lg", label: "LG (18px)", example: "Subheadings" },
                  { size: "text-2xl", label: "2XL (24px)", example: "Headings" },
                  { size: "text-4xl", label: "4XL (36px)", example: "Page titles" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <p className={`${item.size} font-sans text-stone-900 min-w-24`}>
                      {item.label}
                    </p>
                    <p className="text-sm text-stone-600">{item.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* SPACING SCALE */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-display font-bold text-stone-900 mb-2">
              Spacing Scale
            </h2>
            <p className="text-lg text-stone-600">
              4px base unit system
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { unit: "2px", tailwind: "px-0.5", usage: "Minimal spacing" },
              { unit: "4px", tailwind: "px-1", usage: "Icon padding" },
              { unit: "8px", tailwind: "px-2", usage: "Field gaps" },
              { unit: "12px", tailwind: "gap-3", usage: "Button groups" },
              { unit: "16px", tailwind: "p-4 gap-4", usage: "PRIMARY (dialogs, cards)" },
              { unit: "24px", tailwind: "px-6", usage: "Large spacing" },
              { unit: "32px", tailwind: "px-8", usage: "Outer padding" },
              { unit: "48px", tailwind: "py-12", usage: "Sections" },
            ].map((space) => (
              <motion.div
                key={space.unit}
                variants={itemVariants}
                className="bg-stone-50 p-6 rounded-lg border border-stone-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="bg-amber-700 rounded-md"
                    style={{ width: space.unit }}
                  />
                  <div>
                    <p className="font-bold text-stone-900">{space.unit}</p>
                    <p className="text-xs text-stone-600">{space.tailwind}</p>
                  </div>
                </div>
                <p className="text-sm text-stone-600">{space.usage}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ANIMATIONS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-display font-bold text-stone-900 mb-2">
              Motion & Animations
            </h2>
            <p className="text-lg text-stone-600">
              Smooth, purposeful transitions
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Fade In */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Fade In</h3>
              <motion.div
                className="w-full h-16 bg-amber-700 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
              <p className="text-xs text-stone-600 mt-4 font-mono">
                duration: 0.6s
              </p>
            </div>

            {/* Scale Up */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Scale</h3>
              <motion.div
                className="w-full h-16 bg-amber-700 rounded-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
              />
              <p className="text-xs text-stone-600 mt-4 font-mono">
                type: spring
              </p>
            </div>

            {/* Slide In */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Slide Up</h3>
              <motion.div
                className="w-full h-16 bg-amber-700 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
              <p className="text-xs text-stone-600 mt-4 font-mono">
                duration: 0.6s, y: 20px
              </p>
            </div>

            {/* Hover Lift */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Hover Lift</h3>
              <motion.div
                className="w-full h-16 bg-amber-700 rounded-lg cursor-pointer shadow-md"
                whileHover={{ y: -8, boxShadow: "0 20px 25px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.2 }}
              />
              <p className="text-xs text-stone-600 mt-4 font-mono">
                y: -8px, shadow: elevated
              </p>
            </div>

            {/* Active Press */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Active Press</h3>
              <motion.div
                className="w-full h-16 bg-amber-700 rounded-lg cursor-pointer"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              />
              <p className="text-xs text-stone-600 mt-4 font-mono">
                scale: 0.95 (active:scale-95)
              </p>
            </div>

            {/* Stagger */}
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Stagger</h3>
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-full h-4 bg-amber-700 rounded"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
              <p className="text-xs text-stone-600 mt-4 font-mono">
                stagger: 0.1s
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* COMPONENTS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-display font-bold text-stone-900 mb-2">
              Components
            </h2>
            <p className="text-lg text-stone-600">
              Reusable UI building blocks
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Buttons",
                items: ["Primary", "Secondary", "Destructive", "Full Width"],
              },
              {
                name: "Inputs",
                items: ["Text", "Email", "Password", "Error States"],
              },
              {
                name: "Cards",
                items: ["Header", "Content", "Footer", "Actions"],
              },
              {
                name: "Forms",
                items: ["FieldSet", "Field", "Label", "Error Messages"],
              },
              {
                name: "Dialogs",
                items: ["Modal", "Header", "Content", "Footer"],
              },
              {
                name: "Animations",
                items: ["Fade", "Scale", "Slide", "Stagger"],
              },
            ].map((group) => (
              <motion.div
                key={group.name}
                variants={itemVariants}
                className="bg-stone-50 p-6 rounded-lg border border-stone-200"
              >
                <h3 className="text-lg font-bold text-stone-900 mb-4">
                  {group.name}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-stone-600">
                      <div className="w-1.5 h-1.5 bg-amber-700 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* GUIDELINES */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-display font-bold text-stone-900 mb-2">
              Design Principles
            </h2>
            <p className="text-lg text-stone-600">
              Core values guiding design decisions
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Simplicity",
                description:
                  "Clean, minimal design that focuses on essential functionality. Remove unnecessary elements.",
              },
              {
                title: "Consistency",
                description:
                  "Uniform spacing, typography, and component usage throughout the entire application.",
              },
              {
                title: "Accessibility",
                description:
                  "Keyboard navigation, proper contrast ratios, ARIA labels, and inclusive design patterns.",
              },
              {
                title: "Performance",
                description:
                  "Smooth animations, fast interactions, and optimized asset loading for best user experience.",
              },
              {
                title: "Maintenance",
                description:
                  "Reusable components, clear documentation, and easy-to-update design tokens.",
              },
              {
                title: "Heritage",
                description:
                  "Elegant, timeless design inspired by classic aesthetics and vintage charm.",
              },
            ].map((principle) => (
              <motion.div
                key={principle.title}
                variants={itemVariants}
                className="bg-gradient-to-br from-stone-50 to-stone-100 p-8 rounded-lg border border-stone-200"
              >
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-stone-600">{principle.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-stone-900 text-white p-12 rounded-lg text-center"
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            Questions About Our Design System?
          </h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            This design system is living documentation. It's updated regularly as we 
            evolve our product and design patterns. Check back often for updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-amber-700 text-white font-bold rounded-lg hover:bg-amber-800 transition"
            >
              Back to Home
            </Link>
            <a
              href="mailto:design@echosign.io"
              className="px-8 py-3 border border-stone-400 text-white font-bold rounded-lg hover:bg-stone-800 transition"
            >
              Contact Us
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
