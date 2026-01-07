import Groq from "groq-sdk";
import { SignatureEntry } from "@/types/types";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateMemoryReflection(
  entry: SignatureEntry
): Promise<string> {
  if (!entry.memoryText)
    return "A silent mark left in the digital sands of time.";

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Provide a short, poetic, one-sentence reflection on this memory: "${entry.memoryText}". The reflection should be archival and respectful. Do not use conversational filler.`,
        },
      ],
      model: "openai/gpt-oss-20b",
    });
    return (
      chatCompletion.choices[0]?.message?.content ||
      "A profound moment captured for posterity."
    );
  } catch (error) {
    console.error("Groq failed:", error);
    return "A shared fragment of a unique journey.";
  }
}
