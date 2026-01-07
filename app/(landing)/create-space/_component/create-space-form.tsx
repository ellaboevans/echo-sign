"use client";
import { Input } from "@/components/ui/input";
import { store } from "@/store/store";
import { Visibility } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CreateSpaceForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const currentUser = store.getCurrentUser();
    const space = {
      id:
        name.toLowerCase().replaceAll(/[^a-z0-9]/g, "-") +
        "-" +
        Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      description: description.trim() || undefined,
      creatorId: currentUser?.id || "anonymous",
      createdAt: Date.now(),
      visibility: visibility,
    };

    store.saveSpace(space);
    store.track("create_space", { spaceId: space.id });
    router.push(`/space/${space.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-10 rounded-2xl border border-stone-200 shadow-xl space-y-8">
      <div className="space-y-2">
        <label
          htmlFor="space-name"
          className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
          Space Name
        </label>
        <Input
          id="space-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Class of 2024 Legacy"
          className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-700/5 focus:border-amber-700 transition-all text-lg font-medium h-auto"
          required
          maxLength={40}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="purpose"
          className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
          Description / Purpose
        </label>
        <textarea
          id="purpose"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What should people think about when signing here?"
          className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-700/5 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serifs italic"
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="visibility"
          className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
          Visibility Setting
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              id: Visibility.PUBLIC,
              label: "Public",
              desc: "Visible in directory",
            },
            { id: Visibility.UNLISTED, label: "Unlisted", desc: "Link only" },
            { id: Visibility.PRIVATE, label: "Private", desc: "Invite only" },
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVisibility(v.id as Visibility)}
              className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                visibility === v.id
                  ? "border-amber-700 bg-amber-50/50 ring-2 ring-amber-700/10"
                  : "border-stone-200 hover:border-stone-300"
              }`}>
              <span
                className={`text-xs font-bold uppercase tracking-widest ${
                  visibility === v.id ? "text-amber-700" : "text-stone-400"
                }`}>
                {v.label}
              </span>
              <span className="text-[10px] text-stone-400 mt-1">{v.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-stone-900 text-white font-bold uppercase tracking-widest text-sm py-5 rounded-xl hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200">
        Create Space
      </button>
    </form>
  );
}
