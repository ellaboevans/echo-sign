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
import { Space, Visibility } from "@/types/types";
import { generateUUID } from "@/lib/uuid";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/messages";
import { ARIA_LABELS } from "@/lib/accessibility";
import { DialogPrimaryButton, DialogSecondaryButton, DialogButtonGroup } from "@/components/ui/dialog-buttons";

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

    const tenant = store.getCurrentTenant();
    if (!tenant) {
      showToast.error(MESSAGES.FORM.WORKSPACE_NOT_FOUND);
      setIsSubmitting(false);
      return;
    }

    // Generate URL-friendly slug
    const slug = name
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, "");

    const space: Space = {
      id: generateUUID(),
      tenantId: tenant.id,
      name: name.trim(),
      slug,
      description: description.trim() || undefined,
      visibility,
      createdAt: Date.now(),
    };

    store.saveSpace(space);
    store.track(tenant.id, "create_space", { slug });

    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      setName("");
      setDescription("");
      setVisibility(Visibility.PUBLIC);
      globalThis.location.href = `/${slug}`;
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
          <DialogTitle className={"text-2xl"}>Create a New Space</DialogTitle>
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
              required
              maxLength={40}
              aria-label={ARIA_LABELS.SPACE.NAME}
              aria-required="true"
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
              className="w-full px-2.5 py-1 rounded-none border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
              maxLength={200}
              aria-label={ARIA_LABELS.SPACE.DESCRIPTION}
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

          <DialogButtonGroup>
            <DialogSecondaryButton
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </DialogSecondaryButton>
            <DialogPrimaryButton
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
            >
              Create Space
            </DialogPrimaryButton>
          </DialogButtonGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
