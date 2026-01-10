"use client";
import SignatureCanvas from "@/components/signature-canvas";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { store } from "@/store/store";
import { Space, Visibility, UserRole } from "@/types/types";
import { useState } from "react";
import { generateUUID } from "@/lib/uuid";

interface SignDialogProps {
  space: Space;
}

export default function SignDialog({ space }: Readonly<SignDialogProps>) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(() => store.getCurrentUser()?.name || "");
  const [email, setEmail] = useState(() => store.getCurrentUser()?.email || "");
  const [memory, setMemory] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (data: string) => {
    if (!name.trim()) {
      alert("A name is required to associate with your signature.");
      return;
    }

    setIsSubmitting(true);

    const currentTenant = store.getCurrentTenant();
    if (!currentTenant) {
      alert("Unable to find workspace");
      setIsSubmitting(false);
      return;
    }

    let user = store.getCurrentUser();
    if (user?.name !== name || user?.email !== email) {
      user = {
        id: user?.id || generateUUID(),
        tenantId: currentTenant.id,
        name: name,
        email: email || undefined,
        role: UserRole.GUEST,
        createdAt: user?.createdAt || Date.now(),
      };
      store.saveUser(user);
    }

    const entry = {
      id: generateUUID(),
      tenantId: currentTenant.id,
      spaceId: space.id,
      userId: user.id,
      userName: user.name,
      userEmail: email || undefined,
      signatureData: data,
      memoryText: memory.trim() || undefined,
      visibility: visibility,
      createdAt: Date.now(),
    };

    store.saveEntry(entry);
    store.track(currentTenant.id, "sign_space", {
      spaceId: space.id,
      visibility,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      setName(user.name);
      setEmail(user.email || "");
      setMemory("");
      setVisibility(Visibility.PUBLIC);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-block bg-amber-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 duration-300 ease-in-out active:scale-95">
        Leave Your Signature
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={"text-2xl"}>
            Signing the &ldquo;{space.name}&rdquo;
          </DialogTitle>
          <DialogDescription>
            Your signature and memory will be permanently archived in this
            space.
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
                onChange={(e) => setName(e.target.value)}
                placeholder="How should you be remembered?"
                className="w-full rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm"
                required
              />
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="For recovery (never public)"
                className="w-full rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm"
              />
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
              onChange={(e) => setMemory(e.target.value)}
              placeholder="Write a brief thought, message, or reflection..."
              className="w-full px-2 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
            />
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
                        Private (Owner Only)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SignatureCanvas onSave={handleSave} onClear={() => {}} />
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
