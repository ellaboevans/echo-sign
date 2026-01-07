import React from "react";
import CreateSpaceForm from "./_component/create-space-form";

export default function CreateSpace() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="space-y-4 mb-10 text-center">
        <h1 className="text-4xl font-serifs font-bold text-stone-900">
          Establish a New Wall
        </h1>
        <p className="text-stone-500 leading-relaxed">
          Create a dedicated context for others to leave their signatures. A
          high-school yearbook, a family legacy, or a niche interest group.
        </p>
      </div>
      <CreateSpaceForm />
    </div>
  );
}
