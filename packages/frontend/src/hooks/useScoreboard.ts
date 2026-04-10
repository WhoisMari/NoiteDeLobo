import { useEffect, useState } from "react";
import {
  getPlayers,
  createPlayer,
  deletePlayer,
  getRounds,
  createRound,
  deleteRound,
  deleteAllRounds,
} from "../api";
import type { Player, Round } from "../components/utils";

export function useScoreboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showAddRound, setShowAddRound] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [roundPoints, setRoundPoints] = useState<Record<number, number>>({});
  const [confirmDeletePlayer, setConfirmDeletePlayer] = useState<number | null>(
    null,
  );
  const [confirmDeleteRound, setConfirmDeleteRound] = useState<number | null>(
    null,
  );
  const [confirmResetRounds, setConfirmResetRounds] = useState(false);

  useEffect(() => {
    Promise.all([getPlayers(), getRounds()]).then(([p, r]) => {
      setPlayers(p);
      setRounds(r);
      setLoading(false);
    });
  }, []);

  const handleAddPlayer = async () => {
    if (!newPlayerName.trim()) return;
    const player = await createPlayer(newPlayerName.trim());
    setPlayers((prev) =>
      [...prev, player].sort((a, b) => b.totalPoints - a.totalPoints),
    );
    setNewPlayerName("");
    setShowAddPlayer(false);
  };

  const handleDeletePlayer = async (id: number) => {
    await deletePlayer(id);
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    setConfirmDeletePlayer(null);
  };

  const handleOpenRound = () => {
    const initial: Record<number, number> = {};
    players.forEach((p) => {
      initial[p.id] = 0;
    });
    setRoundPoints(initial);
    setShowAddRound(true);
  };

  const handleSaveRound = async () => {
    const scores = Object.entries(roundPoints).map(([playerId, points]) => ({
      playerId: parseInt(playerId),
      points,
    }));
    const round = await createRound(scores);
    setRounds((prev) => [round, ...prev]);
    const updated = await getPlayers();
    setPlayers(updated);
    setShowAddRound(false);
  };

  const handleDeleteRound = async (id: number) => {
    await deleteRound(id);
    setRounds((prev) => prev.filter((r) => r.id !== id));
    const updated = await getPlayers();
    setPlayers(updated);
    setConfirmDeleteRound(null);
  };

  const handleResetRounds = async () => {
    await deleteAllRounds();
    setRounds([]);
    setConfirmResetRounds(false);
  };

  const maxPoints = players[0]?.totalPoints ?? 0;

  return {
    players,
    rounds,
    loading,
    maxPoints,
    showAddPlayer,
    setShowAddPlayer,
    showAddRound,
    setShowAddRound,
    newPlayerName,
    setNewPlayerName,
    roundPoints,
    setRoundPoints,
    confirmDeletePlayer,
    setConfirmDeletePlayer,
    confirmDeleteRound,
    setConfirmDeleteRound,
    handleAddPlayer,
    handleDeletePlayer,
    handleOpenRound,
    handleSaveRound,
    handleDeleteRound,
    confirmResetRounds,
    setConfirmResetRounds,
    handleResetRounds,
  };
}
