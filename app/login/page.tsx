"use client";

import { Suspense } from "react";
import LoginContent from "./login-content";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-stone-500">Loading...</div>
    </div>
  );
}
