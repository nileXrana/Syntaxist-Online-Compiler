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

    const prompt = `Analyze the following ${language} code and provide:

1. **Time Complexity**: Explain the time complexity with Big O notation
2. **Space Complexity**: Explain the space complexity with Big O notation
3. **Brief Explanation**: Why this is the complexity (1-2 sentences each)

Format your response in clear sections with headings.

Code:
\`\`\`${language}
${code}
\`\`\`

Provide a concise, technical analysis.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze code" },
      { status: 500 }
    );
  }
}
