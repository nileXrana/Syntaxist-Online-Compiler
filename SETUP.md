# AI Compiler Setup Guide

This guide will help you set up the AI Compiler with WebSocket-based code execution using Docker containers:

## Prerequisites

- Node.js (v18 or higher)
- Docker Desktop installed and running
- Terminal access

## Project Structure

```
ai-compiler/
├── frontEnd/          # Next.js frontend with Monaco Editor & xterm.js
├── backEnd/           # Express + WebSocket server
└── SETUP.md           # This file
```

## Setup Instructions

### 1. Build Docker Images

First, navigate to the backend directory and build the Docker images for code execution:

```bash
cd backEnd

# Build C++ runner
docker build -t cpp-runner -f Dockerfile.cpp .

# Build Python runner
docker build -t py-runner -f Dockerfile.python .

# Build Java runner
docker build -t java-runner -f Dockerfile.java .
```

**Verify Docker images:**
```bash
docker images | grep runner
```

You should see:
```
cpp-runner    latest    ...
py-runner     latest    ...
java-runner   latest    ...
```

### 2. Start Backend Server

Install dependencies and start the WebSocket server:

```bash
cd backEnd
npm install
npm start
```

**Expected output:**
```
✅ Express on port 3001
WebSocket server on port 8080
```

### 3. Start Frontend

In a new terminal, start the Next.js frontend:

```bash
cd frontEnd
npm install
npm run dev
```

**Expected output:**
```
✓ Ready on http://localhost:3000
```

## Testing the Setup

1. Open http://localhost:3000 in your browser
2. Select a language (Python, C++, or Java)
3. Write or use the default "Welcome to AI Compiler" code
4. Click the Run button
5. See the output in the terminal on the right

### Test with User Input (Python example)

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

When you run this, you can type directly in the terminal, and it will send input to the Docker container.

## Supported Languages

Currently supported (with Docker execution):
- ✅ **Python** - Python 3.11
- ✅ **C++** - GCC compiler
- ✅ **Java** - OpenJDK 21

Coming soon:
- ⏳ JavaScript/Node.js
- ⏳ Go
- ⏳ Ruby
- ⏳ PHP
- ⏳ C#
- ⏳ Swift
- ⏳ Rust

## Features

### ✨ WebSocket Communication
- Real-time bidirectional communication
- Stream stdout/stderr as it happens
- Handle user input during execution

### 🐳 Docker Isolation
- Each code execution runs in an isolated container
- Memory limit: 256MB
- CPU limit: 0.5 cores
- No network access
- Auto-cleanup after execution

### 💻 Terminal Features
- Full xterm.js terminal emulator
- ANSI color support
- Copy terminal content
- Clear terminal
- Dark/Light theme support
- User input handling (backspace, enter, printable chars)

### 🎨 Editor Features
- Monaco Editor (VS Code editor)
- Syntax highlighting for 12 languages
- Auto-completion
- Dark/Light theme
- Code copying
- Dynamic file name display

## Architecture

```
┌─────────────────┐         WebSocket          ┌─────────────────┐
│                 │◄─────────────────────────► │                 │
│   Frontend      │   ws://localhost:8080      │   Backend       │
│   (Next.js)     │                            │   (Express)     │
│                 │                            │                 │
│  - Monaco       │                            │  - WebSocket    │
│  - xterm.js     │                            │  - Docker       │
└─────────────────┘                            └────────┬────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │ Docker Container│
                                               │                 │
                                               │ - Isolated env  │
                                               │ - Code execution│
                                               │ - stdin/stdout  │
                                               └─────────────────┘
```

## Troubleshooting

### Backend won't start
- **Error:** `Port 8080 already in use`
  - **Solution:** Kill the process using port 8080: `lsof -ti:8080 | xargs kill -9`

### Docker images not building
- **Error:** `Cannot connect to Docker daemon`
  - **Solution:** Make sure Docker Desktop is running

### WebSocket connection error in terminal
- **Error:** `[WebSocket connection error - Make sure backend server is running]`
  - **Solution:** 
    1. Check backend is running on port 8080
    2. Check Docker images are built
    3. Check browser console for errors

### Code execution fails
- **Error:** `[Error: Unsupported language]`
  - **Solution:** Currently only C++, Python, and Java are supported. Other languages will show this message.

### Terminal not showing output
- **Solution:** 
  1. Open browser DevTools (F12)
  2. Check Network tab for WebSocket connection
  3. Check Console for errors
  4. Verify backend logs for errors

## Development Notes

### Adding New Language Support

To add support for a new language (e.g., JavaScript):

1. **Create Dockerfile** (`backEnd/Dockerfile.javascript`):
   ```dockerfile
   FROM node:20-slim
   WORKDIR /workspace
   CMD ["/bin/bash"]
   ```

2. **Build Docker image**:
   ```bash
   docker build -t js-runner -f Dockerfile.javascript .
   ```

3. **Update server.js** (add case in switch statement):
   ```javascript
   case "javascript":
     filename = "main.js";
     dockerImage = "js-runner";
     execCmd = "node main.js";
     break;
   ```

4. **Update Terminal.tsx** (add to supported languages check):
   ```typescript
   if (!["cpp", "python", "java", "javascript"].includes(backendLang)) {
     // ...
   }
   ```

## Environment Variables

No environment variables required for basic setup. The Gemini API integration is deprecated in favor of real code execution.

## Security Considerations

- Docker containers have no network access (`--network none`)
- Memory limited to 256MB per execution
- CPU limited to 0.5 cores
- Containers are removed after execution (`--rm`)
- Temporary files stored in `/tmp` with UUID to prevent conflicts

## Performance

- **Cold start:** ~1-2 seconds (Docker container startup)
- **Warm execution:** ~100-500ms (container already running)
- **Terminal latency:** ~10-50ms (WebSocket)

## Future Enhancements

- [ ] Add support for remaining 9 languages
- [ ] Implement code execution timeout
- [ ] Add file upload support
- [ ] Multi-file project support
- [ ] Syntax error highlighting
- [ ] Code formatting
- [ ] Share code via URL
- [ ] Save code to browser storage
- [ ] Execution history

---

**Built with:** Next.js 15.5.5, Monaco Editor, xterm.js, Express, WebSocket, Docker
