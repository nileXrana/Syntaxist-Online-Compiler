import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { code, language } = await request.json();

        if (!code || !language) {
            return NextResponse.json(
                { error: 'Code and language are required' },
                { status: 400 }
            );
        }

        // Get API key from environment variable
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'GEMINI_API_KEY is not configured' },
                { status: 500 }
            );
        }

        // Call Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are a code compiler and executor. Analyze and execute the following ${language} code and provide the output. If there are errors, just show like the real compiler does. Your task is to strictly act as a code compiler and executor. Do not provide any explanations or additional commentary. Only respond with the output of the code execution or error messages as they would appear in a real coding environment.

Language: ${language}
Code: ${code}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: 'Failed to execute code', details: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No output generated';

        return NextResponse.json({ output });

    } catch (error) {
        console.error('Error executing code:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
