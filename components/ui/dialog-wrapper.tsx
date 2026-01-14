/**
 * Reusable dialog wrapper for consistent styling across all dialogs
 * Ensures consistent max-width, max-height, padding, and background colors
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DialogWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-xl",
};

export function DialogWrapper({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "lg",
}: DialogWrapperProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${sizes[size]} max-h-[90vh] overflow-y-auto bg-white`}>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-stone-900">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-pretty">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
