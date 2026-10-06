import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini initialization per guidelines
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. Generate & Enhance Professional CV Summary & Keywords
app.post("/api/gemini/generate-cv", async (req, res) => {
  try {
    const { targetRole, currentTitle, experienceYears, skills, certifications, rawSummary, tone } = req.body;

    if (!ai) {
      // Smart resilient fallback if API key is not yet set in environment
      const generatedSummary = rawSummary && rawSummary.trim().length > 15
        ? `Accomplished and results-driven ${targetRole || currentTitle || "Professional"} with over ${experienceYears || "5"} years of proven expertise in accelerating digital outcomes. Recognized for driving operational excellence, stakeholder engagement, and scalable growth while maintaining rigorous compliance and performance benchmarks.`
        : `Dynamic and performance-oriented ${targetRole || "Specialist"} with ${experienceYears || "4+"} years of progressive experience delivering enterprise-grade solutions. Adept at leveraging modern methodologies, cross-functional collaboration, and strategic execution to exceed organizational milestones.`;

      const suggestedBullets = [
        `Spearheaded cross-functional project deliverables resulting in a 35% improvement in execution cycle velocity and team alignment.`,
        `Championed standard operating procedures and technical benchmarks, reducing operational overhead by 22% within first 6 months.`,
        `Partnered with executive leadership and client stakeholders to translate complex requirements into high-impact, scalable outcomes.`,
        `Mentored junior team members and fostered continuous improvement through structured knowledge sharing and agile practices.`
      ];

      const atsKeywords = [
        targetRole || "Project Leadership",
        "Strategic Planning",
        "Performance Optimization",
        "Stakeholder Management",
        "Cross-Functional Collaboration",
        ...(Array.isArray(skills) ? skills.slice(0, 4) : ["Data Analytics", "Agile Execution"]),
        ...(Array.isArray(certifications) ? certifications.slice(0, 2) : ["PMI Standards", "Quality Assurance"])
      ];

      return res.json({
        summary: generatedSummary,
        bullets: suggestedBullets,
        atsKeywords: atsKeywords,
        success: true,
        source: "fallback"
      });
    }

    const prompt = `You are an elite executive career strategist and technical recruiter for Mindware Consulting Ltd.
A job seeker is creating their professional CV.
Target Role: "${targetRole || 'Senior Specialist'}"
Current/Recent Title: "${currentTitle || targetRole || 'Professional'}"
Years of Experience: "${experienceYears || '3-5'}"
Skills: "${Array.isArray(skills) ? skills.join(', ') : (skills || 'General')}"
Certifications: "${Array.isArray(certifications) ? certifications.join(', ') : (certifications || 'None specified')}"
Candidate draft notes: "${rawSummary || ''}"
Preferred Tone: "${tone || 'Executive, modern, metric-heavy, and high impact'}"

Task:
1. Write a compelling, ATS-optimized 3-sentence Executive Professional Summary.
2. Provide 4 STAR-format (Situation, Task, Action, Result) achievement bullet points highlighting business impact, efficiency gains, and leadership.
3. Suggest 6-8 crucial ATS keywords and industry phrases to include.

Return ONLY a clean JSON object with this exact structure:
{
  "summary": "...",
  "bullets": ["...", "...", "...", "..."],
  "atsKeywords": ["...", "...", "..."]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);

    return res.json({
      summary: parsed.summary || "",
      bullets: parsed.bullets || [],
      atsKeywords: parsed.atsKeywords || [],
      success: true,
      source: "gemini-3.8-flash"
    });
  } catch (err: any) {
    console.error("Gemini CV generation error:", err);
    return res.status(500).json({
      error: "Failed to generate CV enhancement with Gemini",
      details: err?.message || String(err),
      success: false
    });
  }
});

// 2. Enhance Experience Bullets
app.post("/api/gemini/enhance-bullets", async (req, res) => {
  try {
    const { role, company, rawBullets } = req.body;

    if (!ai) {
      return res.json({
        enhancedBullets: [
          `Engineered high-impact solutions for ${company || "enterprise clients"}, reducing delivery lead-time by 28% and ensuring 100% SLA compliance.`,
          `Led multi-disciplinary initiatives across cross-functional squads to successfully achieve key business performance indicators.`,
          `Implemented rigorous quality control and modern best practices, eliminating bottlenecks and optimizing operational throughput.`
        ],
        success: true,
        source: "fallback"
      });
    }

    const prompt = `Transform the following rough work experience notes into 3 to 4 punchy, high-impact STAR-format CV bullet points for the role of "${role || 'Specialist'}" at "${company || 'Company'}".
Use powerful active verbs (Architected, Spearheaded, Accelerated, Optimized, Engineered), incorporate realistic quantifiable metrics (percentages, revenues, efficiency savings), and keep it professional and ATS-optimized.

Notes provided:
"${rawBullets || 'Worked on key projects and led daily operations.'}"

Return ONLY a valid JSON object:
{
  "enhancedBullets": [
    "bullet 1",
    "bullet 2",
    "bullet 3"
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      enhancedBullets: parsed.enhancedBullets || [],
      success: true,
      source: "gemini-3.8-flash"
    });
  } catch (err: any) {
    console.error("Gemini bullets error:", err);
    return res.status(500).json({ error: "Failed to enhance bullets", success: false });
  }
});

// 3. Draft Tailored Cover Letter
app.post("/api/gemini/cover-letter", async (req, res) => {
  try {
    const { candidateName, targetJobTitle, employerName, experienceYears, certifications, skills } = req.body;

    if (!ai) {
      const fallbackLetter = `Dear Hiring Team at ${employerName || "Mindware Consulting"},\n\nI am writing to express my strong interest in the ${targetJobTitle || "Open Role"} position. With over ${experienceYears || "4"} years of demonstrated expertise and verified credentials (${Array.isArray(certifications) ? certifications.join(", ") : "certified professional"}), I have consistently delivered tangible business growth, operational resilience, and technical excellence.\n\nThroughout my career, I have specialized in leveraging ${Array.isArray(skills) ? skills.slice(0, 4).join(", ") : "modern industry tools"} to solve critical business bottlenecks. My approach combines rigorous analytical planning with collaborative execution, ensuring that projects not only meet specifications but deliver measurable commercial return.\n\nI welcome the opportunity to discuss how my qualifications align with your organizational goals. Thank you for your consideration.\n\nSincerely,\n${candidateName || "Candidate"}`;

      return res.json({ coverLetter: fallbackLetter, success: true, source: "fallback" });
    }

    const prompt = `Write a persuasive, professional 3-paragraph Cover Letter for:
Candidate Name: ${candidateName || 'Applicant'}
Applying For: ${targetJobTitle || 'Open Position'}
At: ${employerName || 'Mindware Consulting Ltd'}
Experience: ${experienceYears || '4+'} years
Certifications: ${Array.isArray(certifications) ? certifications.join(', ') : certifications}
Core Competencies: ${Array.isArray(skills) ? skills.join(', ') : skills}

Tone: Confident, articulate, value-focused, and tailored to Nigerian/global enterprise market standards.

Return ONLY a JSON object:
{
  "coverLetter": "..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      coverLetter: parsed.coverLetter || "",
      success: true,
      source: "gemini-3.8-flash"
    });
  } catch (err: any) {
    console.error("Cover letter error:", err);
    return res.status(500).json({ error: "Failed to generate cover letter", success: false });
  }
});

// Full-stack Vite dev middleware or production static serving
async function startServer() {
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
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Mindware App] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
