import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analyze the following ${language} code and determine if it can be optimized in terms of Time Complexity (TC) and Space Complexity (SC).

**Instructions:**
1. Determine if the code can be further optimized to achieve better TC or SC
2. If optimization is possible:
   - explain the optimizations that can be made in brief and short, nothing else.
3. If the code is already optimal:
   - State clearly and give response of one line only, nothing else : "✅ This code is already optimized"

Be honest and accurate. Don't suggest optimizations if they don't actually improve TC/SC.

Code:
\`\`\`${language}
${code}
\`\`\`

Provide your analysis:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ suggestions: text });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to get suggestions";
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
