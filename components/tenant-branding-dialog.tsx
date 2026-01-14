"use client";

import Image from "next/image";
import { TenantBranding, MuralBackground } from "@/types/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogSecondaryButton, DialogPrimaryButton, DialogButtonGroup } from "@/components/ui/dialog-buttons";

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
}: Readonly<TenantBrandingDialogProps>) {
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
  const [bgColor1, setBgColor1] = useState(
    branding.muralBackground?.bgColor1 || "#FAF5F0"
  );
  const [bgColor2, setBgColor2] = useState(
    branding.muralBackground?.bgColor2 || "#FEFAF0"
  );
  const [bgColor3, setBgColor3] = useState(
    branding.muralBackground?.bgColor3 || "#FAF5F0"
  );
  const [dotOpacity, setDotOpacity] = useState(
    branding.muralBackground?.dotOpacity ?? 12
  );
  const [dotSize, setDotSize] = useState(
    branding.muralBackground?.dotSize ?? 1.5
  );
  const [dotSpacing, setDotSpacing] = useState(
    branding.muralBackground?.dotSpacing ?? 40
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
      muralBackground: {
        bgColor1,
        bgColor2,
        bgColor3,
        dotOpacity,
        dotSize,
        dotSpacing,
      },
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
    setBgColor1(branding.muralBackground?.bgColor1 || "#FAF5F0");
    setBgColor2(branding.muralBackground?.bgColor2 || "#FEFAF0");
    setBgColor3(branding.muralBackground?.bgColor3 || "#FAF5F0");
    setDotOpacity(branding.muralBackground?.dotOpacity ?? 12);
    setDotSize(branding.muralBackground?.dotSize ?? 1.5);
    setDotSpacing(branding.muralBackground?.dotSpacing ?? 40);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Branding</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cover Image */}
          <div className="space-y-2">
            <Label className="text-sm font-bold">Cover Image</Label>
            <p className="text-xs text-stone-600 mb-2">
              Large hero banner displayed at top of your homepage. Recommended:
              1200x300px
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
                     className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium transition-colors">
                     Remove Image
                   </button>
                 )}
              </div>
            </div>
            {coverImagePreview && (
              <div className="relative mt-3 rounded-lg overflow-hidden border border-stone-200 h-32">
                <Image
                  src={coverImagePreview}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                  unoptimized
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
                     className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium transition-colors">
                     Remove Image
                   </button>
                 )}
              </div>
            </div>
            {logoImagePreview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 p-2">
                <Image
                  src={logoImagePreview}
                  alt="Logo Preview"
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized
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
                <p className="text-xs text-stone-600 mb-2">Buttons, accents</p>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="primary-color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer border border-stone-300"
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
                <p className="text-xs text-stone-600 mb-2">Links, highlights</p>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="secondary-color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer border border-stone-300"
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
                <p className="text-xs text-stone-600 mb-2">Body text</p>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="text-color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer border border-stone-300"
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

          {/* Signature Canvas Mural Background */}
          <div className="border-t border-stone-200 pt-4">
            <h3 className="text-sm font-bold mb-4">Signature Canvas Background</h3>

            {/* Background Colors */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="bg-color-1" className="text-xs font-bold">
                  Color 1
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="bg-color-1"
                    value={bgColor1}
                    onChange={(e) => setBgColor1(e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer border border-stone-300"
                  />
                  <Input
                    value={bgColor1}
                    onChange={(e) => setBgColor1(e.target.value)}
                    className="flex-1 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color-2" className="text-xs font-bold">
                  Color 2
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="bg-color-2"
                    value={bgColor2}
                    onChange={(e) => setBgColor2(e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer border border-stone-300"
                  />
                  <Input
                    value={bgColor2}
                    onChange={(e) => setBgColor2(e.target.value)}
                    className="flex-1 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color-3" className="text-xs font-bold">
                  Color 3
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="bg-color-3"
                    value={bgColor3}
                    onChange={(e) => setBgColor3(e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer border border-stone-300"
                  />
                  <Input
                    value={bgColor3}
                    onChange={(e) => setBgColor3(e.target.value)}
                    className="flex-1 text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Dot Grid Settings */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="dot-opacity" className="text-xs font-bold">
                    Dot Grid Opacity
                  </Label>
                  <span className="text-xs text-stone-600">{dotOpacity}%</span>
                </div>
                <input
                  type="range"
                  id="dot-opacity"
                  min="0"
                  max="30"
                  value={dotOpacity}
                  onChange={(e) => setDotOpacity(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Visibility of the dot grid pattern
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="dot-size" className="text-xs font-bold">
                    Dot Size
                  </Label>
                  <span className="text-xs text-stone-600">{dotSize.toFixed(1)}px</span>
                </div>
                <input
                  type="range"
                  id="dot-size"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={dotSize}
                  onChange={(e) => setDotSize(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Size of individual dots
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="dot-spacing" className="text-xs font-bold">
                    Dot Spacing
                  </Label>
                  <span className="text-xs text-stone-600">{dotSpacing}px</span>
                </div>
                <input
                  type="range"
                  id="dot-spacing"
                  min="20"
                  max="80"
                  step="5"
                  value={dotSpacing}
                  onChange={(e) => setDotSpacing(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Distance between dots
                </p>
              </div>
            </div>

            {/* Preview */}
            <div
              className="mt-4 p-4 rounded-lg border border-stone-300 h-32"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='${dotSpacing}' height='${dotSpacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${dotSpacing / 2}' cy='${dotSpacing / 2}' r='${dotSize}' fill='%23000' opacity='${dotOpacity / 100}'/%3E%3C/svg%3E")`,
                backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
                backgroundPosition: "0 0",
                background: `linear-gradient(to bottom right, ${bgColor1}, ${bgColor2}, ${bgColor3})`,
                backgroundAttachment: "fixed",
              }}
            />
            <p className="text-xs text-stone-500 mt-2">
              Preview of your signature canvas background
            </p>
          </div>
          </div>

        <DialogButtonGroup justify="between" gap="normal" className="flex-col sm:flex-row">
          <DialogSecondaryButton
            onClick={handleClose}
            disabled={isSaving}
            className="w-full sm:w-auto">
            Cancel
          </DialogSecondaryButton>
          <DialogPrimaryButton
            onClick={handleSave}
            disabled={isSaving}
            isLoading={isSaving}
            className="w-full sm:w-auto">
            {isSaving ? "Saving..." : "Save Branding"}
          </DialogPrimaryButton>
        </DialogButtonGroup>
      </DialogContent>
    </Dialog>
  );
}
