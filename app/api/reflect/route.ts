import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { memoryText } = await request.json();

    if (!memoryText) {
      return NextResponse.json(
        {
          reflection:
            "A silent mark left in the digital sands of time.",
        },
        { status: 200 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Provide a short, poetic, one-sentence reflection on this memory: "${memoryText}". The reflection should be archival and respectful. Do not use conversational filler.`,
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const reflection =
      chatCompletion.choices[0]?.message?.content ||
      "A profound moment captured for posterity.";

    return NextResponse.json({ reflection }, { status: 200 });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      {
        reflection: "A shared fragment of a unique journey.",
      },
      { status: 200 }
    );
  }
}
