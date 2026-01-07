import React, { useEffect, useRef } from "react";
import type { SignaturePad as SignaturePadType } from "signature_pad";

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
      alert("Please provide a signature first.");
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
        />
        <div className="absolute bottom-2 right-2 space-x-2">
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 bg-white/80 rounded border border-stone-200">
            Reset
          </button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-stone-400 font-medium">
        Use your mouse or finger to sign above
      </p>
      <button
        type="button"
        onClick={handleSave}
        className="mt-6 w-full bg-amber-700 text-white font-bold uppercase tracking-widest text-sm py-3 rounded-lg hover:bg-amber-800 transition-colors shadow-lg shadow-stone-200">
        Preserve Signature
      </button>
    </div>
  );
}
