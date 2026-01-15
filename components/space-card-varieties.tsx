"use client";

import Link from "next/link";
import { Space } from "@/types/types";
import AppleFolderIcon from "./apple-folder-icon";

type Props = {
  space: Space;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  variant?: "centered" | "sidebar" | "stacked" | "overlay";
};

/**
 * VARIETY 1: Centered - Folder icon centered, info below
 */
export function SpaceCardCentered({
  space,
  primaryColor,
  secondaryColor,
  textColor,
}: Omit<Props, "variant">) {
  return (
    <Link
      href={`/${space.slug}`}
      className="group relative block h-full transition-all duration-300 hover:translate-y-[-4px]">
      <div className="h-full bg-white rounded-2xl shadow-md border border-stone-100 group-hover:border-stone-300 transition-all duration-300 overflow-hidden flex flex-col">
        {/* Icon Area */}
        <div
          className="flex items-center justify-center py-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${primaryColor}15 0%, transparent 100%)`,
          }}>
          <AppleFolderIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            spaceId={space.id}
            className="w-24 h-24 group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 text-center space-y-4 flex flex-col">
          <div>
            <h2
              className="text-xl font-display font-bold text-balance"
              style={{ color: textColor }}>
              {space.name}
            </h2>
            {space.description && (
              <p className="text-sm text-stone-600 mt-2 line-clamp-2">
                {space.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: `${primaryColor}12`,
                border: `1px solid ${primaryColor}25`,
              }}>
              <div className="text-2xl font-display font-bold" style={{ color: primaryColor }}>
                {space.signatureCount}
              </div>
              <p className="text-xs font-semibold text-stone-700 mt-1">
                {space.signatureCount === 1 ? "Signature" : "Signatures"}
              </p>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: `${secondaryColor}12`,
                border: `1px solid ${secondaryColor}25`,
              }}>
              <div className="text-2xl font-display font-bold" style={{ color: secondaryColor }}>
                {space.publicCount}
              </div>
              <p className="text-xs font-semibold text-stone-700 mt-1">Public</p>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500 font-semibold">
                {new Date(space.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
              <span className="font-bold transition-all duration-200 group-hover:translate-x-1" style={{ color: primaryColor }}>
                Open →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * VARIETY 2: Sidebar - Folder icon on left, info on right
 */
export function SpaceCardSidebar({
  space,
  primaryColor,
  secondaryColor,
  textColor,
}: Omit<Props, "variant">) {
  return (
    <Link
      href={`/${space.slug}`}
      className="group relative block h-full transition-all duration-300 hover:shadow-lg">
      <div className="h-full bg-white rounded-2xl shadow-md border border-stone-100 group-hover:border-stone-300 transition-all duration-300 overflow-hidden flex">
        {/* Icon Section */}
        <div
          className="flex-shrink-0 w-32 flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}20 100%)`,
          }}>
          <AppleFolderIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            spaceId={space.id}
            className="w-16 h-16"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h2
              className="text-lg font-display font-bold text-balance"
              style={{ color: textColor }}>
              {space.name}
            </h2>
            {space.description && (
              <p className="text-sm text-stone-600 mt-1 line-clamp-2">
                {space.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div
              className="p-2 rounded-lg text-center"
              style={{
                backgroundColor: `${primaryColor}12`,
                border: `1px solid ${primaryColor}25`,
              }}>
              <div className="text-lg font-display font-bold" style={{ color: primaryColor }}>
                {space.signatureCount}
              </div>
              <p className="text-xs text-stone-700">
                {space.signatureCount === 1 ? "Sig" : "Sigs"}
              </p>
            </div>
            <div
              className="p-2 rounded-lg text-center"
              style={{
                backgroundColor: `${secondaryColor}12`,
                border: `1px solid ${secondaryColor}25`,
              }}>
              <div className="text-lg font-display font-bold" style={{ color: secondaryColor }}>
                {space.publicCount}
              </div>
              <p className="text-xs text-stone-700">Public</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-stone-100">
            <span className="text-stone-500">
              {new Date(space.createdAt).toLocaleDateString("en-US", {
                month: "short",
              })}
            </span>
            <span className="font-bold transition-all duration-200 group-hover:translate-x-1" style={{ color: primaryColor }}>
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * VARIETY 3: Stacked - Large folder icon, name in colored header
 */
export function SpaceCardStacked({
  space,
  primaryColor,
  secondaryColor,
  textColor,
}: Omit<Props, "variant">) {
  return (
    <Link
      href={`/${space.slug}`}
      className="group relative block h-full transition-all duration-300 hover:scale-105">
      <div className="h-full bg-white rounded-2xl shadow-md border border-stone-100 group-hover:border-stone-300 transition-all duration-300 overflow-hidden flex flex-col">
        {/* Colored Header with Name */}
        <div
          className="p-4 text-white"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}>
          <h2 className="text-lg font-display font-bold text-balance">
            {space.name}
          </h2>
        </div>

        {/* Icon Area */}
        <div className="flex-1 flex items-center justify-center py-8">
          <AppleFolderIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            spaceId={space.id}
            className="w-28 h-28 group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Stats */}
        <div className="px-6 pb-6 space-y-3">
          {space.description && (
            <p className="text-sm text-stone-600 text-center line-clamp-1">
              {space.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: `${primaryColor}12`,
                border: `1px solid ${primaryColor}25`,
              }}>
              <div className="text-xl font-display font-bold" style={{ color: primaryColor }}>
                {space.signatureCount}
              </div>
              <p className="text-xs text-stone-700">Signatures</p>
            </div>
            <div
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: `${secondaryColor}12`,
                border: `1px solid ${secondaryColor}25`,
              }}>
              <div className="text-xl font-display font-bold" style={{ color: secondaryColor }}>
                {space.publicCount}
              </div>
              <p className="text-xs text-stone-700">Public</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200">
            <span className="text-stone-500">
              {new Date(space.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </span>
            <span className="font-bold transition-all duration-200 group-hover:translate-x-1" style={{ color: primaryColor }}>
              Open →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * VARIETY 4: Overlay - Folder as background with overlay content
 */
export function SpaceCardOverlay({
  space,
  primaryColor,
  secondaryColor,
  textColor,
}: Omit<Props, "variant">) {
  return (
    <Link
      href={`/${space.slug}`}
      className="group relative block h-full transition-all duration-300 hover:shadow-xl">
      <div className="h-full rounded-2xl shadow-md overflow-hidden border border-stone-100 group-hover:border-stone-300 transition-all duration-300 relative">
        {/* Background - Large folder icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
          <AppleFolderIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            spaceId={space.id}
            className="w-40 h-40"
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}d9 0%, ${secondaryColor}d9 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-2xl font-display font-bold text-balance mb-2">
              {space.name}
            </h2>
            {space.description && (
              <p className="text-sm line-clamp-2 opacity-90">
                {space.description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div
                className="p-3 rounded-lg backdrop-blur-sm text-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                }}>
                <div className="text-2xl font-display font-bold">
                  {space.signatureCount}
                </div>
                <p className="text-xs uppercase font-semibold mt-1">Signatures</p>
              </div>
              <div
                className="p-3 rounded-lg backdrop-blur-sm text-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                }}>
                <div className="text-2xl font-display font-bold">
                  {space.publicCount}
                </div>
                <p className="text-xs uppercase font-semibold mt-1">Public</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-white/20">
              <span className="opacity-80">
                {new Date(space.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
              <span className="font-bold transition-all duration-200 group-hover:translate-x-1">
                Open →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
