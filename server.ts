import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  handleCareerApplicationRequest,
  handleCoverLetterRequest,
  handleEnhanceBulletsRequest,
  handleEnquiriesRequest,
  handleGenerateCvRequest,
  handleNewsletterRequest,
  handleNewsletterUnsubscribeRequest,
  handleProcessOutboxRequest,
} from "./api/_lib/handlers";
import { sendJson } from "./api/_lib/http";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: false, limit: "64kb" }));

// Translate Express body-parser JSON syntax & payload size errors into clean JSON API responses
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!err) {
      next();
      return;
    }
    if (err.type === "entity.too.large" || err.status === 413) {
      sendJson(res, 413, {
        success: false,
        error: "Request payload is too large.",
      });
      return;
    }
    if (err instanceof SyntaxError && "body" in err) {
      sendJson(res, 400, {
        success: false,
        error: "Invalid JSON request body.",
      });
      return;
    }
    next(err);
  }
);

// Baseline security headers & strict block on private data/migration directories
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use(["/data", "/supabase"], (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Shared API endpoints (exact parity with Vercel Serverless Functions in api/*)
app.all("/api/gemini/generate-cv", (req, res) => {
  void handleGenerateCvRequest(req, res);
});

app.all("/api/gemini/enhance-bullets", (req, res) => {
  void handleEnhanceBulletsRequest(req, res);
});

app.all("/api/gemini/cover-letter", (req, res) => {
  void handleCoverLetterRequest(req, res);
});

app.all("/api/enquiries", (req, res) => {
  void handleEnquiriesRequest(req, res);
});

app.all("/api/careers/applications", (req, res) => {
  void handleCareerApplicationRequest(req, res);
});

app.all("/api/newsletter", (req, res) => {
  void handleNewsletterRequest(req, res);
});

app.all("/api/newsletter/unsubscribe", (req, res) => {
  void handleNewsletterUnsubscribeRequest(req, res);
});

app.all("/api/internal/process-outbox", (req, res) => {
  void handleProcessOutboxRequest(req, res);
});

app.all("/api/*", (_req, res) => {
  sendJson(res, 404, { success: false, error: "API endpoint not found." });
});

// Full-stack Vite dev middleware or production static serving
async function startServer() {
  app.use(express.static(path.resolve(__dirname, "public")));

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true",
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Mindware App] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
