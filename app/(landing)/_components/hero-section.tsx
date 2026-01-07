import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section className="text-center space-y-4 py-8">
      <h1 className="text-4xl md:text-6xl font-serifs font-bold text-stone-900 leading-tight">
        A Permanent Record <br /> of{" "}
        <span
          className="relative inline-block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='20' viewBox='0 0 200 20' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 15 Q 25 5, 50 15 T 100 15 T 150 15 T 200 15' stroke='%23b45309' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "0 100%",
            backgroundSize: "auto 8px",
          }}>
          Human Presence
        </span>
        .
      </h1>
      <p className="max-w-2xl mx-auto text-stone-600 font-medium leading-relaxed">
        Sign the walls of history. Leave a memory, share a fragment of your
        life, and browse the collective directory of digital existence.
      </p>
      <div className="pt-4">
        <Link
          href="/spaces"
          className="inline-block bg-amber-700 text-white font-bold uppercase tracking-widest px-8 py-3 rounded-md hover:bg-amber-800 transition-all shadow-xl shadow-amber-100">
          Start Signing
        </Link>
      </div>
    </section>
  );
}
