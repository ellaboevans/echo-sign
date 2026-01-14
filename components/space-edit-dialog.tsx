"use client";

import { Space, Visibility } from "@/types/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/messages";
import { DialogPrimaryButton, DialogSecondaryButton, DialogButtonGroup } from "@/components/ui/dialog-buttons";

interface SpaceEditDialogProps {
  space: Space;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSpace: Space) => void;
}

export default function SpaceEditDialog({
  space,
  isOpen,
  onClose,
  onSave,
}: Readonly<SpaceEditDialogProps>) {
  const [name, setName] = useState(space.name);
  const [description, setDescription] = useState(space.description || "");
  const [visibility, setVisibility] = useState<Visibility | null>(
    space.visibility
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!visibility) {
      showToast.error(MESSAGES.FORM.VISIBILITY_REQUIRED);
      return;
    }

    setIsSaving(true);

    // Update space with new values
    const updatedSpace: Space = {
      ...space,
      name,
      description: description || undefined,
      visibility,
      updatedAt: Date.now(),
    };

    onSave(updatedSpace);
    setIsSaving(false);
    onClose();
  };

  const handleClose = () => {
    // Reset form to original values
    setName(space.name);
    setDescription(space.description || "");
    setVisibility(space.visibility);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Edit Space</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Space Name */}
          <div className="space-y-2">
            <Label htmlFor="space-name" className="text-sm font-bold">
              Space Name
            </Label>
            <Input
              id="space-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Graduation 2025"
              className="text-base"
            />
            <p className="text-xs text-stone-500">
              Required. Display name for this space.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="space-description" className="text-sm font-bold">
              Description
            </Label>
            <textarea
              id="space-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Sign our graduation wall and share your memories"
              className="w-full p-2 border border-stone-300 rounded-md text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-xs text-stone-500">
              Optional. Brief description shown to guests.
            </p>
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label htmlFor="space-visibility" className="text-sm font-bold">
              Visibility
            </Label>
            <Select
              value={visibility || ""}
              onValueChange={(value) => setVisibility(value as Visibility)}>
              <SelectTrigger id="space-visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Visibility.PUBLIC}>
                  <div>
                    <div className="font-bold">Public</div>
                    <div className="text-xs text-stone-600">
                      Visible to everyone
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value={Visibility.UNLISTED}>
                  <div>
                    <div className="font-bold">Unlisted</div>
                    <div className="text-xs text-stone-600">
                      Only via direct link
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value={Visibility.PRIVATE}>
                  <div>
                    <div className="font-bold">Private</div>
                    <div className="text-xs text-stone-600">
                      Only you can see
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-stone-500">
              Controls who can find this space.
            </p>
          </div>
        </div>

        <DialogButtonGroup>
          <DialogSecondaryButton
            onClick={handleClose}
            disabled={isSaving}
          >
            Cancel
          </DialogSecondaryButton>
          <DialogPrimaryButton
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            isLoading={isSaving}
          >
            Save Changes
          </DialogPrimaryButton>
        </DialogButtonGroup>
      </DialogContent>
    </Dialog>
  );
}
