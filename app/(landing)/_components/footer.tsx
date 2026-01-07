import React from "react";

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-serifs italic text-stone-500 text-lg mb-2">
          &ldquo;Every mark tells a story. Every story deserves to be kept.
          &rdquo;
        </p>
        <p className="text-xs text-stone-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} EchoSign • Archival Grade Digital
          Identity
        </p>
      </div>
    </footer>
  );
}
