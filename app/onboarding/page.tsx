"use client";

import SignupForm from "./_components/signup-form";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      setIsDevMode(host.includes("localhost") || host.includes("127.0.0.1"));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-stone-900">
            Echo Sign
          </h1>
          <p className="text-lg text-stone-600">
            Create signature walls. Invite others to leave their mark.
          </p>
        </div>

        {/* Form */}
        <SignupForm />

        {/* Footer */}
        <div className="space-y-3 pt-8 border-t border-stone-200">
          <p className="text-xs text-stone-500">
            {isDevMode ? "Dev Mode - Path-Based Routing" : "After signup:"}
          </p>
          {!isDevMode && (
            <p className="text-sm text-stone-600">
              Go to your dashboard to create your first space: <br />
              <code className="text-xs bg-stone-100 px-2 py-1 rounded">
                yoursubdomain.echosign.io/dashboard
              </code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
