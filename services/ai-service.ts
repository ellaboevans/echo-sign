import { SignatureEntry } from "@/types/types";

export async function generateMemoryReflection(
  entry: SignatureEntry
): Promise<string> {
  if (!entry.memoryText)
    return "A silent mark left in the digital sands of time.";

  try {
    const response = await fetch("/api/reflect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memoryText: entry.memoryText }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reflection || "A profound moment captured for posterity.";
  } catch (error) {
    console.error("Reflection generation failed:", error);
    return "A shared fragment of a unique journey.";
  }
}
