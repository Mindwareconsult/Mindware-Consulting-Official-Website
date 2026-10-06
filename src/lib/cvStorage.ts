import { CVData } from "../components/careers/AICVBuilder";

const STORAGE_KEY = "mindware_user_active_cv";

export function getStoredCV(): CVData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CVData;
  } catch (e) {
    return null;
  }
}

export function saveStoredCV(cv: CVData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
  } catch (e) {
    console.error("Failed to save CV to localStorage", e);
  }
}
