# Setup Instructions for AI Compiler

## Quick Start Guide

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API Key" or "Create API Key"
4. Copy the generated API key

### Step 2: Configure Environment Variables

1. In your project root directory, create a file named `.env.local`:

```bash
touch .env.local
```

2. Open `.env.local` and add your API key:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

Replace `your_actual_gemini_api_key_here` with the API key you copied from Google AI Studio.

### Step 3: Install Dependencies (if not already installed)

```bash
npm install
```

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## How It Works

1. **Select a Language**: Choose from 12+ programming languages in the header dropdown
2. **Write/Edit Code**: The editor will load with a default "Welcome to AI Compiler" code for that language
3. **Run Code**: Click the Run button (▶) to send your code to Gemini API
4. **View Output**: The AI will analyze your code and show the execution result or error messages in the output panel

## Features

- ✅ Real-time code editing with syntax highlighting
- ✅ Support for Python, JavaScript, Java, C++, Go, Ruby, PHP, C#, TypeScript, Swift, Kotlin, and Rust
- ✅ AI-powered code analysis and execution
- ✅ Copy code and output to clipboard
- ✅ Clear output functionality
- ✅ Dynamic filename based on selected language

## Troubleshooting

### "GEMINI_API_KEY is not configured" Error

- Make sure you created the `.env.local` file in the root directory
- Verify the API key is correctly copied (no extra spaces)
- Restart the development server after adding the environment variable

### API Rate Limits

- Free tier has usage limits
- If you hit the limit, wait a few minutes or upgrade your plan

## File Structure

```
app/
├── api/
│   └── execute/
│       └── route.ts          # API endpoint for code execution
├── components/
│   ├── CodeEditor.tsx        # Main code editor component
│   └── Header.tsx            # Header with language selector
├── page.tsx                  # Main page with state management
└── globals.css               # Global styles
```

## Important Notes

- The `.env.local` file is already included in `.gitignore` to keep your API key secure
- Never commit your API key to version control
- The Gemini API simulates code execution (doesn't actually run the code on a server)
