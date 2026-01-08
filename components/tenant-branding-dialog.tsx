"use client";

import { TenantBranding } from "@/types/types";
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

interface TenantBrandingDialogProps {
  branding: TenantBranding | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSave: (branding: TenantBranding) => void;
}

export default function TenantBrandingDialog({
  branding = {},
  isOpen,
  onClose,
  onSave,
}: TenantBrandingDialogProps) {
  const [primaryColor, setPrimaryColor] = useState(
    branding.primaryColor || "#B45309"
  );
  const [secondaryColor, setSecondaryColor] = useState(
    branding.secondaryColor || "#92400E"
  );
  const [textColor, setTextColor] = useState(branding.textColor || "#1C1917");
  const [tagline, setTagline] = useState(branding.tagline || "");
  const [footerText, setFooterText] = useState(branding.footerText || "");
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    branding.coverImage || null
  );
  const [logoImagePreview, setLogoImagePreview] = useState<string | null>(
    branding.logoImage || null
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCoverImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);

    const updatedBranding: TenantBranding = {
      primaryColor,
      secondaryColor,
      textColor,
      tagline: tagline || undefined,
      footerText: footerText || undefined,
      coverImage: coverImagePreview || undefined,
      logoImage: logoImagePreview || undefined,
    };

    onSave(updatedBranding);
    setIsSaving(false);
    onClose();
  };

  const handleClose = () => {
    setCoverImagePreview(branding.coverImage || null);
    setLogoImagePreview(branding.logoImage || null);
    setPrimaryColor(branding.primaryColor || "#B45309");
    setSecondaryColor(branding.secondaryColor || "#92400E");
    setTextColor(branding.textColor || "#1C1917");
    setTagline(branding.tagline || "");
    setFooterText(branding.footerText || "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Branding</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cover Image */}
          <div className="space-y-2">
            <Label className="text-sm font-bold">Cover Image</Label>
            <p className="text-xs text-stone-600 mb-2">
              Large hero banner displayed at top of your homepage. Recommended: 1200x300px
            </p>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="w-full text-sm"
                />
                {coverImagePreview && (
                  <button
                    onClick={() => setCoverImagePreview(null)}
                    className="mt-2 text-xs text-red-600 hover:text-red-700 font-bold">
                    Remove Image
                  </button>
                )}
              </div>
            </div>
            {coverImagePreview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-stone-200">
                <img
                  src={coverImagePreview}
                  alt="Cover Preview"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
          </div>

          {/* Logo Image */}
          <div className="space-y-2">
            <Label className="text-sm font-bold">Logo</Label>
            <p className="text-xs text-stone-600 mb-2">
              Small square logo. Recommended: 200x200px
            </p>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoImageUpload}
                  className="w-full text-sm"
                />
                {logoImagePreview && (
                  <button
                    onClick={() => setLogoImagePreview(null)}
                    className="mt-2 text-xs text-red-600 hover:text-red-700 font-bold">
                    Remove Image
                  </button>
                )}
              </div>
            </div>
            {logoImagePreview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 p-2">
                <img
                  src={logoImagePreview}
                  alt="Logo Preview"
                  className="w-20 h-20 object-contain"
                />
              </div>
            )}
          </div>

          {/* Colors Section */}
          <div className="border-t border-stone-200 pt-4">
            <h3 className="text-sm font-bold mb-4">Brand Colors</h3>

            <div className="grid grid-cols-3 gap-4">
              {/* Primary Color */}
              <div className="space-y-2">
                <Label htmlFor="primary-color" className="text-xs font-bold">
                  Primary Color
                </Label>
                <p className="text-xs text-stone-600 mb-2">
                  Buttons, accents
                </p>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="primary-color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-stone-300"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 text-sm font-mono"
                    placeholder="#B45309"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-2">
                <Label htmlFor="secondary-color" className="text-xs font-bold">
                  Secondary Color
                </Label>
                <p className="text-xs text-stone-600 mb-2">
                  Links, highlights
                </p>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="secondary-color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-stone-300"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-1 text-sm font-mono"
                    placeholder="#92400E"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div className="space-y-2">
                <Label htmlFor="text-color" className="text-xs font-bold">
                  Text Color
                </Label>
                <p className="text-xs text-stone-600 mb-2">
                  Body text
                </p>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="text-color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-stone-300"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 text-sm font-mono"
                    placeholder="#1C1917"
                  />
                </div>
              </div>
            </div>

            {/* Color Preview */}
            <div className="mt-4 p-4 rounded-lg border border-stone-200 bg-stone-50">
              <p className="text-xs font-bold text-stone-600 mb-2">Preview:</p>
              <div className="flex gap-2 items-center">
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: primaryColor }}
                  title="Primary"
                />
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: secondaryColor }}
                  title="Secondary"
                />
                <div
                  className="w-8 h-8 rounded border border-stone-300"
                  style={{ backgroundColor: textColor }}
                  title="Text"
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: textColor }}>
                  Sample Text
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label htmlFor="tagline" className="text-sm font-bold">
              Tagline
            </Label>
            <Input
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g., Signature Collection"
              className="text-sm"
              maxLength={60}
            />
            <p className="text-xs text-stone-500">
              Short phrase displayed under your name. Max 60 characters.
            </p>
          </div>

          {/* Footer Text */}
          <div className="space-y-2">
            <Label htmlFor="footer-text" className="text-sm font-bold">
              Footer Text
            </Label>
            <textarea
              id="footer-text"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              placeholder="e.g., © 2025 Creative Studio. All signatures preserved."
              className="w-full p-2 border border-stone-300 rounded-md text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-amber-500"
              maxLength={200}
            />
            <p className="text-xs text-stone-500">
              Custom message at bottom of your pages. Max 200 characters.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isSaving} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-amber-700 hover:bg-amber-800 text-white">
            {isSaving ? "Saving..." : "Save Branding"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
