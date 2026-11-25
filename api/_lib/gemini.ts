import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import { getGeminiApiKey } from "./env";
import { sanitizeText } from "./validation";

export const GEMINI_MODEL = "gemini-4-hydrogen";
const GEMINI_TIMEOUT_MS = 8000;

let cachedClient: GoogleGenAI | null = null;
let cachedApiKey = "";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedApiKey = apiKey;
    cachedClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        timeout: GEMINI_TIMEOUT_MS,
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return cachedClient;
}

export class GeminiUnavailableError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "GeminiUnavailableError";
    this.statusCode = statusCode;
  }
}

export async function generateCvContent(body: Record<string, unknown>): Promise<{
  summary: string;
  bullets: string[];
  atsKeywords: string[];
  model: string;
}> {
  const targetRole = sanitizeText(body.targetRole, 120);
  const currentTitle = sanitizeText(body.currentTitle, 120);
  const experienceYears = sanitizeText(body.experienceYears, 40);
  const skills = Array.isArray(body.skills)
    ? body.skills.slice(0, 15).map((s) => sanitizeText(s, 60)).filter(Boolean)
    : [];
  const certifications = Array.isArray(body.certifications)
    ? body.certifications.slice(0, 10).map((c) => sanitizeText(c, 80)).filter(Boolean)
    : [];
  const rawSummary = sanitizeText(body.rawSummary, 1500);
  const tone = sanitizeText(body.tone, 100);

  if (!targetRole && !currentTitle && !rawSummary && skills.length === 0) {
    throw new GeminiUnavailableError(
      "Please enter a target role, title, skills, or draft summary first.",
      400
    );
  }

  const ai = getGeminiClient();
  if (!ai) {
    throw new GeminiUnavailableError(
      "AI writing assistance is not configured on this server.",
      503
    );
  }

  const prompt = `A job seeker is creating their professional CV.
Target Role: "${targetRole || currentTitle || "Senior Specialist"}"
Current/Recent Title: "${currentTitle || targetRole || "Professional"}"
Years of Experience: "${experienceYears || "3-5"}"
Skills: "${skills.join(", ") || "General"}"
Certifications: "${certifications.join(", ") || "None specified"}"
Candidate draft notes: "${rawSummary}"
Preferred Tone: "${tone || "Executive, modern, metric-heavy, and high impact"}"

Task:
1. Write a compelling, ATS-optimized 3-sentence Executive Professional Summary.
2. Provide 4 concise STAR-format achievement bullet points highlighting business impact, efficiency gains, and leadership.
3. Suggest 6-8 crucial ATS keywords and industry phrases to include.`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      systemInstruction:
        "You are an executive career strategist and technical recruiter for Mindware Consulting Ltd. Return concise, ATS-ready JSON strictly matching the requested schema.",
      responseMimeType: "application/json",
      maxOutputTokens: 1800,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      abortSignal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          bullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          atsKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["summary", "bullets", "atsKeywords"],
      },
    },
  });

  let parsed: { summary?: unknown; bullets?: unknown; atsKeywords?: unknown };
  try {
    parsed = JSON.parse(response.text || "{}");
  } catch {
    throw new GeminiUnavailableError(
      "AI returned an unreadable response. Please retry.",
      502
    );
  }

  const summary = sanitizeText(parsed.summary, 2000);
  const bullets = Array.isArray(parsed.bullets)
    ? parsed.bullets.slice(0, 6).map((b) => sanitizeText(b, 400)).filter(Boolean)
    : [];
  const atsKeywords = Array.isArray(parsed.atsKeywords)
    ? parsed.atsKeywords.slice(0, 12).map((k) => sanitizeText(k, 80)).filter(Boolean)
    : [];

  if (!summary) {
    throw new GeminiUnavailableError(
      "AI returned an incomplete CV summary. Please retry.",
      502
    );
  }

  return {
    summary,
    bullets,
    atsKeywords,
    model: GEMINI_MODEL,
  };
}

export async function enhanceExperienceBullets(body: Record<string, unknown>): Promise<{
  enhancedBullets: string[];
  model: string;
}> {
  const role = sanitizeText(body.role, 120);
  const company = sanitizeText(body.company, 140);
  const rawBullets = sanitizeText(body.rawBullets, 1500);

  if (!role && !rawBullets) {
    throw new GeminiUnavailableError(
      "Please provide a role title or rough experience notes to enhance.",
      400
    );
  }

  const ai = getGeminiClient();
  if (!ai) {
    throw new GeminiUnavailableError(
      "AI writing assistance is not configured on this server.",
      503
    );
  }

  const prompt = `Transform the following rough work experience notes into 3 to 4 punchy, high-impact STAR-format CV bullet points for the role of "${
    role || "Specialist"
  }" at "${company || "Company"}".
Use powerful active verbs (Architected, Spearheaded, Accelerated, Optimized, Engineered), incorporate realistic quantifiable outcomes, and keep it professional and ATS-optimized.

Notes provided:
"${rawBullets || "Worked on key projects and led daily operations."}"`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      systemInstruction:
        "You are an executive CV editor for Mindware Consulting Ltd. Return 3 to 4 concise, high-impact JSON bullet strings.",
      responseMimeType: "application/json",
      maxOutputTokens: 1400,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      abortSignal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          enhancedBullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["enhancedBullets"],
      },
    },
  });

  let parsed: { enhancedBullets?: unknown };
  try {
    parsed = JSON.parse(response.text || "{}");
  } catch {
    throw new GeminiUnavailableError(
      "AI returned an unreadable bullet response. Please retry.",
      502
    );
  }

  const enhancedBullets = Array.isArray(parsed.enhancedBullets)
    ? parsed.enhancedBullets
        .slice(0, 6)
        .map((b) => sanitizeText(b, 400))
        .filter(Boolean)
    : [];

  if (enhancedBullets.length === 0) {
    throw new GeminiUnavailableError(
      "AI returned empty bullet enhancements. Please retry.",
      502
    );
  }

  return {
    enhancedBullets,
    model: GEMINI_MODEL,
  };
}

export async function generateCoverLetterContent(body: Record<string, unknown>): Promise<{
  coverLetter: string;
  model: string;
}> {
  const candidateName = sanitizeText(body.candidateName, 120);
  const targetJobTitle = sanitizeText(body.targetJobTitle, 140);
  const employerName = sanitizeText(body.employerName, 140);
  const experienceYears = sanitizeText(body.experienceYears, 40);
  const certifications = Array.isArray(body.certifications)
    ? body.certifications.slice(0, 10).map((c) => sanitizeText(c, 80)).filter(Boolean)
    : sanitizeText(body.certifications, 200);
  const skills = Array.isArray(body.skills)
    ? body.skills.slice(0, 15).map((s) => sanitizeText(s, 60)).filter(Boolean)
    : sanitizeText(body.skills, 250);

  if (!targetJobTitle && !candidateName) {
    throw new GeminiUnavailableError(
      "Please provide candidate or target job details to generate a cover letter.",
      400
    );
  }

  const ai = getGeminiClient();
  if (!ai) {
    throw new GeminiUnavailableError(
      "AI writing assistance is not configured on this server.",
      503
    );
  }

  const prompt = `Write a persuasive, professional 3-paragraph Cover Letter for:
Candidate Name: ${candidateName || "Applicant"}
Applying For: ${targetJobTitle || "Open Position"}
At: ${employerName || "Mindware Consulting Ltd"}
Experience: ${experienceYears || "4+"} years
Certifications: ${Array.isArray(certifications) ? certifications.join(", ") : certifications}
Core Competencies: ${Array.isArray(skills) ? skills.join(", ") : skills}

Tone: Confident, articulate, value-focused, and tailored to Nigerian/global enterprise market standards.`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      systemInstruction:
        "You are an executive career advisor for Mindware Consulting Ltd. Return a concise 3-paragraph cover letter in strict JSON format.",
      responseMimeType: "application/json",
      maxOutputTokens: 1800,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      abortSignal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          coverLetter: { type: Type.STRING },
        },
        required: ["coverLetter"],
      },
    },
  });

  let parsed: { coverLetter?: unknown };
  try {
    parsed = JSON.parse(response.text || "{}");
  } catch {
    throw new GeminiUnavailableError(
      "AI returned an unreadable cover letter response. Please retry.",
      502
    );
  }

  const coverLetter = sanitizeText(parsed.coverLetter, 4000);
  if (!coverLetter) {
    throw new GeminiUnavailableError(
      "AI returned an empty cover letter. Please retry.",
      502
    );
  }

  return {
    coverLetter,
    model: GEMINI_MODEL,
  };
}
