import React, { useEffect, useRef } from "react";
import type { SignaturePad as SignaturePadType } from "signature_pad";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/messages";
import { ARIA_LABELS } from "@/lib/accessibility";
import { DialogFullWidthButton, DialogSmallButton } from "@/components/ui/dialog-buttons";

interface SignatureCanvasProps {
  onSave: (dataUrl: string) => void;
  onClear: () => void;
}

export default function SignatureCanvas({
  onSave,
  onClear,
}: Readonly<SignatureCanvasProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePadType | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
      canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
      canvasRef.current.getContext("2d")?.scale(ratio, ratio);

      signaturePadRef.current = new globalThis.SignaturePad(canvasRef.current, {
        penColor: "rgb(28, 25, 23)",
        minWidth: 1.5,
        maxWidth: 3.5,
      });
    }

    return () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.off();
      }
    };
  }, []);

  const handleClear = () => {
    signaturePadRef.current?.clear();
    onClear();
  };

  const handleSave = () => {
    if (signaturePadRef.current?.isEmpty()) {
      showToast.error(MESSAGES.FORM.SIGNATURE_REQUIRED);
      return;
    }
    const dataUrl = signaturePadRef.current?.toDataURL("image/png");
    onSave(dataUrl as string);
  };

  return (
    <div className="w-full">
      <div className="relative bg-gray-50 border-dashed border-2 border-gray-200">
        <canvas
          ref={canvasRef}
          className="signature-canvas w-full h-48 rounded-lg cursor-crosshair"
          aria-label={ARIA_LABELS.SIGNATURE.CANVAS}
          role="img"
        />
        <div className="absolute bottom-2 right-2">
          <DialogSmallButton
            onClick={handleClear}
            variant="secondary"
          >
            Reset
          </DialogSmallButton>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-stone-400 font-medium">
        Use your mouse or finger to sign above
      </p>
      <DialogFullWidthButton
        onClick={handleSave}
        type="button"
        className="mt-6"
      >
        Preserve Signature
      </DialogFullWidthButton>
    </div>
  );
}
