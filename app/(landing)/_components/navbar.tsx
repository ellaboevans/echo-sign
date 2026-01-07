"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-display font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                EchoSign
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className={`text-sm font-medium ${
                  path === "/"
                    ? "text-amber-700"
                    : "text-stone-500 hover:text-stone-900"
                }`}>
                Live Feed
              </Link>
              <Link
                href="/spaces"
                className={`text-sm font-medium ${
                  path === "/spaces"
                    ? "text-amber-700"
                    : "text-stone-500 hover:text-stone-900"
                }`}>
                Directory
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/create-space"
              className="text-sm font-medium px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors">
              Create Space
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
