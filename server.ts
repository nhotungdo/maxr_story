import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI lazily to prevent crashing on startup if the key is missing.
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined in the secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Route for AI Feedback
app.post("/api/ai/feedback", async (req, res) => {
  try {
    const { character, chapter, concept, scenario, choice, consequence } = req.body;

    if (!character || !chapter || !concept || !scenario || !choice || !consequence) {
      res.status(400).json({ error: "Missing required parameters." });
      return;
    }

    const ai = getAiClient();

    const prompt = `
Nhân vật: ${character}
Chương học: Chương ${chapter} - ${concept}
Tình huống: ${scenario}
Lựa chọn của người chơi: ${choice}
Kết quả kinh doanh lập tức: ${consequence}

Hãy viết một đoạn giải thích ngắn gọn, sinh động bằng tiếng Việt với vai trò "Giáo sư AI" chuyên ngành Kinh tế chính trị Mác - Lênin.
Chỉ ra trực quan khái niệm kinh tế chính trị liên quan đến kết quả này (ví dụ: quy luật giá trị, cạnh tranh, độc quyền, giá trị thặng dư, cung cầu...). 
Viết tối đa 4 câu, thật dễ hiểu, thực tế và mang tính khích lệ học tập!
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là Giáo sư AI giảng dạy môn Kinh tế chính trị Mác - Lênin cực kỳ dí dỏm, thực tế và dễ gần. Bạn giải thích các hiện tượng kinh doanh thực tế qua lăng kính lý thuyết Mác - Lênin một cách ngắn gọn, súc tích (dưới 100 từ), sử dụng các ví dụ sinh động.",
        temperature: 0.7,
      },
    });

    res.json({ feedback: response.text || "Chúc mừng bạn đã đưa ra quyết định! Hãy tiếp tục hành trình kinh tế này." });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    res.status(500).json({
      error: error.message || "Đã xảy ra lỗi khi kết nối với Giáo sư AI.",
      fallback: "Giáo sư AI đang bận nghiên cứu tư bản, nhưng lựa chọn của bạn rất thú vị! Nó phản ánh trực tiếp quy luật cung cầu và sự vận hành thực tế của thị trường."
    });
  }
});

// Configure Vite middleware in development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Error starting server:", err);
});
