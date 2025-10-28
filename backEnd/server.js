import express from "express";
import { WebSocketServer } from "ws";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000"}));

// ---------------- WebSocket ----------------
const wss = new WebSocketServer({ port: 8080 });
console.log("✅ WebSocket running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client connected");
  let proc = null;

  ws.on("message", async (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "run") {
      const id = uuidv4();
      const dir = path.join("/tmp", id);
      fs.mkdirSync(dir);

      let filename, dockerImage, execCmd;

      switch (data.lang) {
        case "cpp":
          filename = "main.cpp";
          dockerImage = "cpp-runner";
          execCmd = "g++ main.cpp -o main.out && ./main.out";
          break;
        case "python":
          filename = "main.py";
          dockerImage = "py-runner";
          execCmd = "python3 main.py";
          break;
        case "java":
          filename = "Main.java";
          dockerImage = "java-runner";
          execCmd = "javac Main.java && java Main";
          break;
        default:
          return ws.send(JSON.stringify({ type: "error", data: "Unsupported language" }));
      }

      fs.writeFileSync(path.join(dir, filename), data.code);

      const dockerCmd = [
        "run", "--rm", "-i", "--network", "none",
        "--memory", "256m", "--cpus", "0.5",
        "-v", `${dir}:/workspace`,
        "-w", "/workspace",
        dockerImage, "bash", "-c", execCmd
      ];

      proc = spawn("docker", dockerCmd);

      proc.stdout.on("data", (d) =>
        ws.send(JSON.stringify({ type: "stdout", data: d.toString() }))
      );
      proc.stderr.on("data", (d) =>
        ws.send(JSON.stringify({ type: "stderr", data: d.toString() }))
      );
      proc.on("close", (code) =>
        ws.send(JSON.stringify({ type: "exit", code }))
      );
    }

    if (data.type === "stdin" && proc) proc.stdin.write(data.data);
  });

  ws.on("close", () => {
    if (proc) proc.kill("SIGKILL");
    console.log("Client disconnected");
  });
});

app.get("/", (_, res) => res.json({ 
  status: "running", 
  message: "Multi-language compiler backend running",
  websocket: "ws://localhost:8080",
  supportedLanguages: ["cpp", "python", "java"]
}));
app.listen(3001, () => console.log("✅ Express on port 3001"));
