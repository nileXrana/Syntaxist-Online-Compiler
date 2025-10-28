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

    const prompt = `Analyze the following ${language} code and provide helpful suggestions for improvement:

1. **Code Quality**: Best practices, readability improvements
2. **Performance**: Optimization opportunities
3. **Security**: Potential vulnerabilities or unsafe patterns
4. **Refactoring**: Better ways to structure the code
5. **Modern Features**: Language-specific modern syntax/features to use

Be specific, actionable, and concise. Format with clear headings.

Code:
\`\`\`${language}
${code}
\`\`\`

Provide practical, implementable suggestions.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ suggestions: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get suggestions" },
      { status: 500 }
    );
  }
}
