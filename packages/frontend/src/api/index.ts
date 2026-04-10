import type { Character, Player, Round } from "../components/utils";

const BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const getCharacters = () => request<Character[]>("/characters");
export const patchCharacter = (
  id: number,
  data: Partial<Pick<Character, "isEnabled" | "nightOrder">>,
) =>
  request<Character>(`/characters/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const getPlayers = () => request<Player[]>("/players");
export const createPlayer = (name: string) =>
  request<Player>("/players", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
export const updatePlayer = (id: number, name: string) =>
  request<Player>(`/players/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
export const deletePlayer = (id: number) =>
  request<void>(`/players/${id}`, { method: "DELETE" });

export const getRounds = () => request<Round[]>("/rounds");
export const createRound = (scores: { playerId: number; points: number }[]) =>
  request<Round>("/rounds", {
    method: "POST",
    body: JSON.stringify({ scores }),
  });
export const deleteRound = (id: number) =>
  request<void>(`/rounds/${id}`, { method: "DELETE" });
export const deleteAllRounds = () =>
  request<void>("/rounds", { method: "DELETE" });
