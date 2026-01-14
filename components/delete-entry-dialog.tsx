"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onConfirm: () => void;
};

export function DeleteEntryDialog({ children, onConfirm }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            signature entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 pt-4 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="px-6 py-2.5 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Yes, delete entry
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
