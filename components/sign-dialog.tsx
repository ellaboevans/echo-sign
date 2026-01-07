"use client";
import SignatureCanvas from "@/components/signature-canvas";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { Space, Visibility } from "@/types/types";
import { useState } from "react";

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
  const [_, setSignatureData] = useState<string | null>(null);

  const handleSave = async (data: string) => {
    setSignatureData(data);
    if (!name.trim()) {
      alert("A name is required to associate with your signature.");
      return;
    }

    setIsSubmitting(true);

    let user = store.getCurrentUser();
    if (user?.name !== name) {
      user = {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        createdAt: Date.now(),
      };
      store.saveUser(user);
    }

    const entry = {
      id: crypto.randomUUID(),
      spaceId: space.id,
      userId: user.id,
      userName: user.name,
      signatureData: data,
      memoryText: memory.trim() || undefined,
      visibility: visibility,
      createdAt: Date.now(),
    };

    store.saveEntry(entry);
    store.track("sign_space", { spaceId: space.id, visibility });

    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      setName(user.name);
      setEmail(user.email || "");
      setMemory("");
      setVisibility(Visibility.PUBLIC);
      setSignatureData(null);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-block bg-amber-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-amber-800 transition-all shadow-xl shadow-stone-200 duration-300 ease-in-out active:scale-95">
        Leave Your Signature
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={'text-2xl'}>Signing the &ldquo;{space.name}&rdquo;</DialogTitle>
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
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-auto"
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
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-auto"
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
              className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serif italic"
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
                  <SelectTrigger className="w-45">
                    <SelectValue />
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
          <div className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
