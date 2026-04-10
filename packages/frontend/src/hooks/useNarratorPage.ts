import { useEffect, useState, useRef } from "react";
import { getCharacters } from "../api";
import { useNarratorStore } from "../store/narratorStore";
import { useSettingsStore } from "../store/settingsStore";
import { useAudio } from "./useAudio";

export const roleHints: Record<string, { en: string; pt: string }> = {
  doppelganger: {
    en: "Look at one other player's card. You are now that role for the rest of the game.",
    pt: "Olhe a carta de outro jogador. Você agora é esse papel pelo resto do jogo.",
  },
  werewolf: {
    en: "Make eye contact with the other Werewolves.",
    pt: "Encontre e faça contato visual com os outros Werewolves.",
  },
  minion: {
    en: "Werewolves: stick out your thumbs so the Minion can see you.",
    pt: "Werewolves: levantem os polegares para que o Minion possa vê-los.",
  },
  mason: {
    en: "Look for the other Mason and make eye contact.",
    pt: "Encontre o outro Mason e faça contato visual.",
  },
  seer: {
    en: "Look at one player's card, OR look at any two center cards.",
    pt: "Olhe a carta de um jogador, OU olhe duas cartas do centro.",
  },
  robber: {
    en: "Swap your card with another player's card, then look at your new card.",
    pt: "Troque sua carta com a de outro jogador e veja sua nova carta.",
  },
  troublemaker: {
    en: "Swap the cards of two other players without looking at them.",
    pt: "Troque as cartas de dois outros jogadores sem olhá-las.",
  },
  drunk: {
    en: "Swap your card with any center card. Do not look at it.",
    pt: "Troque sua carta com qualquer carta do centro. Não a olhe.",
  },
  insomniac: {
    en: "Look at your card to see if it changed during the night.",
    pt: "Olhe sua carta para ver se ela mudou durante a noite.",
  },
};

export function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function useNarratorPage() {
  const {
    steps,
    currentIndex,
    phase,
    setSteps,
    start,
    setPhase,
    advance,
    reset,
  } = useNarratorStore();
  const { autoAdvanceSeconds, discussionSeconds, language } =
    useSettingsStore();
  const { play, playFile, stop } = useAudio();

  const bgRef = useRef<HTMLAudioElement | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [autoTimeLeft, setAutoTimeLeft] = useState(0);
  const [votePhase, setVotePhase] = useState<
    "idle" | "countdown" | "finale" | "voted"
  >("idle");
  const [voteSecondsLeft, setVoteSecondsLeft] = useState(0);
  const [finalCount, setFinalCount] = useState(3);
  const [dawnReady, setDawnReady] = useState(false);

  useEffect(() => {
    getCharacters().then((chars) => setSteps(chars));
  }, [setSteps]);

  useEffect(() => {
    if (phase === "waking" && currentIndex === 0) {
      const bg = new Audio("/audio/background.mp3");
      bg.loop = true;
      bg.volume = 0.4;
      bg.play().catch(() => {});
      bgRef.current = bg;
    }
    if (phase === "idle") {
      bgRef.current?.pause();
      bgRef.current = null;
    }
  }, [phase, currentIndex]);

  useEffect(() => {
    if (phase === "idle") {
      setVotePhase("idle");
      setVoteSecondsLeft(0);
      setFinalCount(3);
      setDawnReady(false);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    setDawnReady(false);
    playFile("everyone_wake").then(() => {
      bgRef.current?.pause();
      bgRef.current = null;
      setDawnReady(true);
    });
  }, [phase]);

  useEffect(() => {
    if (phase === "idle" || phase === "active" || phase === "done") return;
    const step = steps[currentIndex];
    if (!step) return;
    const action = phase === "waking" ? "wake" : "sleep";
    play(action, step.character.key).then(() => {
      if (phase === "waking") setPhase("active");
      else if (phase === "sleeping") advance();
    });
    return () => stop();
  }, [phase, currentIndex]);

  useEffect(() => {
    if (phase !== "active") {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      setAutoTimeLeft(0);
      return;
    }
    if (autoAdvanceSeconds === 0) return;
    setAutoTimeLeft(autoAdvanceSeconds);
    autoTimerRef.current = setInterval(() => {
      setAutoTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(autoTimerRef.current!);
          setPhase("sleeping");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [phase, currentIndex, autoAdvanceSeconds]);

  useEffect(() => {
    if (votePhase !== "countdown") return;
    if (voteSecondsLeft <= 0) {
      setVotePhase("finale");
      setFinalCount(3);
      return;
    }
    if (voteSecondsLeft === 30) {
      playFile("30_seconds");
    }
    const t = setTimeout(() => setVoteSecondsLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [votePhase, voteSecondsLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (votePhase !== "finale") return;
    if (finalCount <= 0) {
      setVotePhase("voted");
      return;
    }
    playFile(String(finalCount));
    const t = setTimeout(() => setFinalCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [votePhase, finalCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (votePhase !== "voted") return;
    playFile("vote");
  }, [votePhase]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleStop() {
    stop();
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    bgRef.current?.pause();
    bgRef.current = null;
    reset();
  }

  function startVote() {
    setVotePhase("countdown");
    setVoteSecondsLeft(discussionSeconds);
  }

  const currentStep = steps[currentIndex];
  const hint = currentStep ? roleHints[currentStep.character.key] : null;
  const isAudioPhase = phase === "waking" || phase === "sleeping";

  return {
    steps,
    currentIndex,
    phase,
    start,
    setPhase,
    language,
    autoAdvanceSeconds,
    discussionSeconds,
    autoTimeLeft,
    votePhase,
    setVotePhase,
    voteSecondsLeft,
    finalCount,
    setFinalCount,
    dawnReady,
    currentStep,
    hint,
    isAudioPhase,
    handleStop,
    startVote,
    reset,
  };
}
