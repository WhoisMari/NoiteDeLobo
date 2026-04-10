import { create } from "zustand";
import type { Character } from "../components/utils";

export type NightPhase = "idle" | "waking" | "active" | "sleeping" | "done";

export interface NightStep {
  character: Character;
}

interface NarratorStore {
  steps: NightStep[];
  currentIndex: number;
  phase: NightPhase;

  setSteps: (characters: Character[]) => void;
  start: () => void;
  setPhase: (phase: NightPhase) => void;
  advance: () => void;
  reset: () => void;
}

export const useNarratorStore = create<NarratorStore>((set, get) => ({
  steps: [],
  currentIndex: 0,
  phase: "idle",

  setSteps: (characters) => {
    const steps = characters
      .filter((c) => c.isEnabled && c.nightOrder !== null)
      .sort((a, b) => (a.nightOrder ?? 0) - (b.nightOrder ?? 0))
      .filter(
        (c, i, arr) =>
          arr.findIndex((x) => x.nightOrder === c.nightOrder) === i,
      )
      .map((c) => ({ character: c }));
    set({ steps, currentIndex: 0, phase: "idle" });
  },

  start: () => set({ currentIndex: 0, phase: "waking" }),

  setPhase: (phase) => set({ phase }),

  advance: () => {
    const { currentIndex, steps } = get();
    const next = currentIndex + 1;
    if (next >= steps.length) {
      set({ phase: "done" });
    } else {
      set({ currentIndex: next, phase: "waking" });
    }
  },

  reset: () => set({ currentIndex: 0, phase: "idle" }),
}));
