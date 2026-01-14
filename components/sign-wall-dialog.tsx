"use client";

import { useState } from "react";
import { store } from "@/store/store";
import { Tenant, Space, Visibility, SignatureEntry } from "@/types/types";
import SignatureCanvas from "./signature-canvas";
import { Input } from "./ui/input";
import { generateUUID } from "@/lib/uuid";
import { showToast } from "@/lib/toast";
import {
  signWallSchema,
  getFieldError,
  hasFieldError,
} from "@/lib/validations";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface SignWallDialogProps {
  tenant?: Tenant;
  space?: Space;
  onSigned?: () => void;
}

export default function SignWallDialog({
  tenant,
  space,
  onSigned,
}: Readonly<SignWallDialogProps>) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [memory, setMemory] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const handleSave = async (data: string) => {
    setSignatureData(data);
    setErrors(null);

    // Validate form data
    const formData = {
      name: name.trim(),
      email: email.trim() || "",
      memory: memory.trim() || "",
      visibility,
      signatureData: data,
    };

    const result = signWallSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error);
      const firstError = result.error.errors[0];
      showToast.error(firstError.message);
      return;
    }

    setIsSubmitting(true);

    try {
      if (!tenant || !space) {
        throw new Error("Tenant or space not found");
      }

      // Create entry (guest or user)
      const entry: SignatureEntry = {
        id: generateUUID(),
        tenantId: tenant.id,
        spaceId: space.id,
        userId: undefined, // Guest signatures don't have user ID
        userName: result.data.name,
        userEmail: result.data.email || undefined,
        signatureData: result.data.signatureData,
        memoryText: result.data.memory || undefined,
        visibility: result.data.visibility,
        createdAt: Date.now(),
      };

      store.saveEntry(entry);
      store.track(tenant.id, "sign_wall", { spaceId: space.id, visibility });

      showToast.success("Signature saved successfully!");
      
      // Reset form
      setIsSubmitting(false);
      setOpen(false);
      setName("");
      setEmail("");
      setMemory("");
      setVisibility(Visibility.PUBLIC);
      setSignatureData(null);
      setErrors(null);
      
      if (onSigned) {
        onSigned();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save signature. Please try again.";
      showToast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-block bg-amber-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 duration-300 ease-in-out active:scale-95">
        Leave Your Signature
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Signing &ldquo;{space?.name || tenant?.displayName}&rdquo;
          </DialogTitle>
          <DialogDescription>
            Your signature and memory will be permanently archived in this wall.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
                Your Name / Alias
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors) setErrors(null);
                }}
                placeholder="How should you be remembered?"
                className={`w-full ${
                  hasFieldError(errors, "name")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
                required
              />
              {hasFieldError(errors, "name") && (
                <p className="text-xs text-red-600 font-medium">
                  {getFieldError(errors, "name")}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
                Email (Optional)
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors) setErrors(null);
                }}
                placeholder="For recovery (never public)"
                className={`w-full ${
                  hasFieldError(errors, "email")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {hasFieldError(errors, "email") && (
                <p className="text-xs text-red-600 font-medium">
                  {getFieldError(errors, "email")}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="memory"
              className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
              Optional Memory
            </label>
            <textarea
              id="memory"
              value={memory}
              onChange={(e) => {
                setMemory(e.target.value);
                if (errors) setErrors(null);
              }}
              placeholder="Write a brief thought, message, or reflection..."
              className={`w-full px-2 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic ${
                hasFieldError(errors, "memory")
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              {hasFieldError(errors, "memory") && (
                <p className="text-xs text-red-600 font-medium">
                  {getFieldError(errors, "memory")}
                </p>
              )}
              <p className="text-xs text-stone-400 ml-auto">
                {memory.length}/500 characters
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="mark"
                className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
                The Mark
              </label>
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="visibility"
                  className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  Visibility:
                </label>
                <Select
                  value={visibility}
                  onValueChange={(value) => setVisibility(value as Visibility)}>
                  <SelectTrigger className="w-fit pr-1">
                    {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={Visibility.PUBLIC}>Public</SelectItem>
                      <SelectItem value={Visibility.UNLISTED}>
                        Unlisted
                      </SelectItem>
                      <SelectItem value={Visibility.PRIVATE}>
                        Private
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SignatureCanvas onSave={handleSave} onClear={() => {}} />
            {hasFieldError(errors, "signatureData") && (
              <p className="text-xs text-red-600 font-medium mt-2">
                {getFieldError(errors, "signatureData")}
              </p>
            )}
            {hasFieldError(errors, "visibility") && (
              <p className="text-xs text-red-600 font-medium mt-2">
                {getFieldError(errors, "visibility")}
              </p>
            )}
          </div>
        </div>

        {isSubmitting && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-xs rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
