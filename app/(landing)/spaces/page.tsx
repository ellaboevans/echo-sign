import React from "react";
import SpaceConfiguration from "../spaces/_components/space-config";

export default function SpacesView() {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-serifs font-bold text-stone-900 mb-4">
          Directory of Spaces
        </h1>
        <p className="text-stone-600 leading-relaxed">
          Browse specialized walls created by the community. Each space
          represents a different context, from memorials to simple greetings.
        </p>
      </div>
      <SpaceConfiguration />
    </div>
  );
}
