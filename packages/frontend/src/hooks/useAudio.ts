import { useRef, useCallback } from "react";
import { useSettingsStore } from "../store/settingsStore";

export function useAudio() {
  const language = useSettingsStore((s) => s.language);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playFile = useCallback(
    (filename: string): Promise<void> => {
      return new Promise((resolve) => {
        if (audioRef.current) audioRef.current.pause();
        const audio = new Audio(`/audio/${language}/${filename}.mp3`);
        audioRef.current = audio;
        audio.addEventListener("ended", () => resolve());
        audio.addEventListener("error", () => resolve());
        audio.play().catch(() => resolve());
      });
    },
    [language],
  );

  const play = useCallback(
    (action: "wake" | "sleep", characterKey: string): Promise<void> => {
      return new Promise((resolve) => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const url = `/audio/${language}/${action}_${characterKey}.mp3`;
        const audio = new Audio(url);
        audioRef.current = audio;

        audio.addEventListener("ended", () => resolve());
        audio.addEventListener("error", () => {
          resolve();
        });

        audio.play().catch(() => resolve());
      });
    },
    [language],
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  return { play, playFile, stop };
}
