declare module "signature_pad" {
  export interface SignaturePadOptions {
    penColor?: string;
    minWidth?: number;
    maxWidth?: number;
    minDistance?: number;
    velocityFilterWeight?: number;
  }

  export interface Point {
    x: number;
    y: number;
    pressure: number;
  }

  export class SignaturePad {
    constructor(canvas: HTMLCanvasElement, options?: SignaturePadOptions);
    clear(): void;
    isEmpty(): boolean;
    toDataURL(type?: string, encoderOptions?: number): string;
    toData(): Point[][];
    fromData(pointGroups: Point[][]): void;
    on(): void;
    off(): void;
  }
}

// eslint-disable-next-line no-var
declare var SignaturePad: typeof import("signature_pad").SignaturePad;
