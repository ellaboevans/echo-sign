"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LoginDialog } from "@/components/login-dialog";
import { LandingButton } from "@/components/landing/landing-button";

export default function FinalCtaSection() {
  const [loginOpen, setLoginOpen] = useState(false);
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
          <LandingButton href="/onboarding" variant="primary">
            Create Your Wall Now
          </LandingButton>
          <LoginDialog>
            <LandingButton variant="secondary" onClick={() => setLoginOpen(true)}>
              Already Have an Account?
            </LandingButton>
          </LoginDialog>
        </div>
      </motion.div>
    </section>
  );
}
