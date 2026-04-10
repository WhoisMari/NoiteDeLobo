import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  language: "en" | "pt";
  autoAdvanceSeconds: number;
  discussionSeconds: number;
  setLanguage: (lang: "en" | "pt") => void;
  setAutoAdvanceSeconds: (s: number) => void;
  setDiscussionSeconds: (s: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      language: "en",
      autoAdvanceSeconds: 0,
      discussionSeconds: 180,
      setLanguage: (language) => set({ language }),
      setAutoAdvanceSeconds: (autoAdvanceSeconds) =>
        set({ autoAdvanceSeconds }),
      setDiscussionSeconds: (discussionSeconds) => set({ discussionSeconds }),
    }),
    { name: "noite-de-lobo-settings" },
  ),
);
