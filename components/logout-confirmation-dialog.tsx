/**
 * Logout Confirmation Dialog
 * Replaces native confirm() with a proper dialog component
 * Ensures consistent UX for logout confirmation
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { DialogSecondaryButton, DialogDestructiveButton, DialogButtonGroup } from "@/components/ui/dialog-buttons";

interface LogoutConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function LogoutConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: Readonly<LogoutConfirmationDialogProps>) {
  const handleConfirm = () => {
    onConfirm();
    // Don't close dialog here - let the redirect happen
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg">Logout?</DialogTitle>
          </div>
          <DialogDescription className="mt-2">
            Are you sure you want to logout? You will be redirected to the home
            page and will need to log in again to access your dashboard.
          </DialogDescription>
        </DialogHeader>

        <DialogButtonGroup>
          <DialogSecondaryButton
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </DialogSecondaryButton>
          <DialogDestructiveButton
            onClick={handleConfirm}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Logout
          </DialogDestructiveButton>
        </DialogButtonGroup>
      </DialogContent>
    </Dialog>
  );
}
