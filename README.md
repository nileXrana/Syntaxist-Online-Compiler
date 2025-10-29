# 🚀 Syntaxist - AI-Powered Online Code Compiler

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://www.docker.com/)

> A powerful, AI-enhanced online code compiler supporting 10+ programming languages with real-time execution, complexity analysis, and intelligent code optimization.

🌐 **Live Demo**: [syntaxist.com](https://syntaxist.com)

## ✨ Features

### 🎯 Core Capabilities
- **Multi-Language Support**: Execute code in 10+ programming languages
  - 🐍 Python
  - 📜 JavaScript
  - ➕ C++
  - ☕ Java
  - 🐹 Go
  - 🦀 Rust
  - 💎 Ruby
  - 🐘 PHP
  - 🕊️ Swift
  - #️⃣ C#

### 🤖 AI-Powered Features
- **Time & Space Complexity Analysis**: Get instant Big O notation analysis
- **Code Optimization**: AI-powered suggestions to improve your code
- **Smart Suggestions**: Intelligent recommendations for better coding practices

### 💻 Development Environment
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Interactive Terminal**: Real-time output with input support via xterm.js
- **WebSocket Communication**: Fast, bidirectional code execution
- **Docker Containerization**: Secure, isolated execution environment
- **Dark/Light Mode**: Eye-friendly themes for any preference

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.5.5 (React 19)
- **Language**: TypeScript
- **Editor**: Monaco Editor
- **Terminal**: xterm.js
- **Styling**: Tailwind CSS
- **UI Components**: React Icons, React Toastify
- **AI Integration**: Google Gemini AI

### Backend
- **Runtime**: Node.js with Express.js
- **WebSocket**: ws library for real-time communication
- **Containerization**: Docker (12 language-specific images)
- **Process Management**: Child processes for code execution

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker Desktop
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nileXrana/AI-Powered-Online-Compiler.git
cd AI-Powered-Online-Compiler
```

2. **Build Docker images**
```bash
bash setup.sh
```

3. **Setup Frontend**
```bash
cd frontEnd
npm install
cp .env.local.example .env.local
# Add your GEMINI_API_KEY to .env.local
npm run dev
```

4. **Setup Backend**
```bash
cd backEnd
npm install
npm start
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- WebSocket: ws://localhost:8080

## 📦 Project Structure

```
├── frontEnd/                 # Next.js frontend application
│   ├── app/
│   │   ├── api/             # API routes (complexity, suggestions)
│   │   ├── components/      # React components
│   │   │   ├── Header.tsx
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── Terminal.tsx
│   │   │   └── AnalysisPopup.tsx
│   │   ├── layout.tsx       # Root layout with SEO
│   │   └── page.tsx         # Main page
│   └── public/              # Static assets
├── backEnd/                 # Express.js backend
│   ├── server.js           # WebSocket server
│   ├── Dockerfile.*        # Language-specific Docker images
│   └── package.json
└── setup.sh                # Docker images build script
```

## 🎨 Features in Detail

### Code Editor
- Syntax highlighting for all supported languages
- Auto-completion and IntelliSense
- Line numbers and minimap
- Multiple themes (light/dark)
- Code snippets and templates

### Terminal
- Real-time output streaming
- Interactive input support (stdin)
- ANSI color support
- Copy and clear functionality
- Persistent state during execution

### AI Analysis
- **TC/SC Analysis**: Understand your algorithm's efficiency
- **Optimization Suggestions**: Get AI-powered tips to improve code
- **Real-time Feedback**: Instant analysis with Google Gemini

## 🔐 Security

- Docker containerization for isolated execution
- Input sanitization and validation
- Rate limiting on API endpoints
- CORS configuration
- Security headers (CSP, HSTS, X-Frame-Options)

## 🌟 SEO Optimization

- Comprehensive meta tags (50+ keywords)
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for rich snippets
- Sitemap and robots.txt
- PWA support with manifest.json
- Performance optimization (image optimization, compression)
- Semantic HTML with schema.org markup

## 📊 Performance

- Server-side rendering (SSR) with Next.js
- Code splitting and lazy loading
- Image optimization (WebP, AVIF)
- Gzip compression
- CDN-ready architecture

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nilesh Rana**
- GitHub: [@nileXrana](https://github.com/nileXrana)
- Website: [syntaxist.com](https://syntaxist.com)

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- xterm.js for terminal emulation
- Google Gemini AI for intelligent code analysis
- Docker for containerization
- Next.js team for the amazing framework

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/nileXrana/AI-Powered-Online-Compiler/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nileXrana/AI-Powered-Online-Compiler/discussions)

---

<div align="center">
  Made with ❤️ by the Syntaxist Team
  
  ⭐ Star us on GitHub — it motivates us a lot!
</div>

## 🔑 Keywords

online compiler, code compiler, run code online, execute code, Python compiler, JavaScript compiler, C++ compiler, Java compiler, online IDE, code editor, AI code analysis, time complexity, space complexity, code optimization, programming online, coding platform, free compiler, web IDE, developer tools, learn to code, practice coding, algorithm analysis, Big O notation, real-time compiler, multi-language compiler, Docker compiler, WebSocket compiler
