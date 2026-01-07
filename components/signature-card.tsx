import { SignatureEntry } from "@/types/types";
import Image from "next/image";
import React from "react";

type Props = {
  entry: SignatureEntry;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
};

export default function SignatureCard({
  entry,
  onDelete,
  isOwner,
}: Readonly<Props>) {
  return (
    <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col h-full">
      <div className="mb-4 aspect-2/1 bg-stone-50 flex items-center justify-center p-2 rounded border border-stone-100 overflow-hidden">
        <Image
          width={4000}
          height={4000}
          src={entry.signatureData}
          alt={`Signature of ${entry.userName}`}
          loading="eager"
          decoding="async"
          className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90"
        />
      </div>

      {entry.memoryText && (
        <div className="grow">
          <p className="text-stone-700 text-sm italic leading-relaxed font-serifs line-clamp-4">
            &ldquo;{entry.memoryText}&rdquo;
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-400 font-bold">
        <div className="flex flex-col">
          <span className="text-stone-900 truncate max-w-30">
            {entry.userName}
          </span>
          <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
        </div>

        {isOwner && onDelete && (
          <button
            onClick={() => onDelete(entry.id)}
            className="text-red-400 hover:text-red-600 transition-colors"
            title="Remove this memory">
            Delete
          </button>
        )}
      </div>

      {entry.visibility === "unlisted" && (
        <div className="absolute top-2 right-2 bg-stone-100 text-stone-500 text-[8px] px-1.5 py-0.5 rounded uppercase font-bold">
          Unlisted
        </div>
      )}
    </div>
  );
}
