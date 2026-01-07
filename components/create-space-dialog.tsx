"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { store } from "@/store/store";
import { Visibility } from "@/types/types";
import { cn } from "@/lib/utils";

interface CreateSpaceDialogProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

export default function CreateSpaceDialog({
  children,
  triggerClassName,
}: Readonly<CreateSpaceDialogProps>) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

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

    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      setName("");
      setDescription("");
      setVisibility(Visibility.PUBLIC);
      globalThis.location.href = `/space/${space.id}`;
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          "text-sm font-medium px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors",
          triggerClassName
        )}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a New Space</DialogTitle>
          <DialogDescription>
            Build a wall for signatures and memories. Define its purpose and who
            can see it.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
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
              className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-700/5 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
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
                {
                  id: Visibility.UNLISTED,
                  label: "Unlisted",
                  desc: "Link only",
                },
                {
                  id: Visibility.PRIVATE,
                  label: "Private",
                  desc: "Invite only",
                },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVisibility(v.id)}
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
                  <span className="text-[10px] text-stone-400 mt-1">
                    {v.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="px-6 py-2 border border-stone-200 active:scale-95 duration-300 rounded-lg text-stone-900 font-medium hover:bg-stone-50 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 active:scale-95 duration-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Creating..." : "Create Space"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
