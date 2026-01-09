"use client";

export default function FooterSection() {
  return (
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
  );
}
