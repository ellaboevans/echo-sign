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
import { store } from "@/store/store";
import { Space, Visibility } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignView({ id: spaceId }: { id: string }) {
  const [space, setSpace] = useState<Space | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [memory, setMemory] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (spaceId) {
      const found = store.getSpace(spaceId);
      if (found) {
        const timer = setTimeout(() => {
          setSpace(found);
          const currentUser = store.getCurrentUser();
          if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email || "");
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [spaceId]);

  const handleSave = async (signatureData: string) => {
    if (!name.trim()) {
      alert("A name is required to associate with your signature.");
      return;
    }

    setIsSubmitting(true);

    // Simulate soft identity
    let user = store.getCurrentUser();
    if (!user || user.name !== name) {
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
      spaceId: spaceId!,
      userId: user.id,
      userName: user.name,
      signatureData: signatureData,
      memoryText: memory.trim() || undefined,
      visibility: visibility,
      createdAt: Date.now(),
    };

    store.saveEntry(entry);
    store.track("sign_space", { spaceId, visibility });

    // Smooth transition
    setTimeout(() => {
      router.push(`/space/${spaceId}`);
    }, 500);
  };

  if (!space) return null;
  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-serifs font-bold text-stone-900">
          Signing the &ldquo;{space.name}&rdquo;
        </h1>
        <p className="text-stone-500 text-sm">
          Your signature and memory will be permanently archived in this space.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="your-name"
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
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all text-sm h-32 resize-none font-serifs italic"
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
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center space-y-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-serifs italic text-stone-900">
              Securing your place in history...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
