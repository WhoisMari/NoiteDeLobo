export interface Character {
  id: number;
  key: string;
  name: string;
  emoji: string;
  nightOrder: number | null;
  isEnabled: boolean;
}

export interface Player {
  id: number;
  name: string;
  totalPoints: number;
  createdAt: string;
}

export interface RoundScore {
  id: number;
  playerId: number;
  points: number;
  player: { id: number; name: string };
}

export interface Round {
  id: number;
  createdAt: string;
  scores: RoundScore[];
}
