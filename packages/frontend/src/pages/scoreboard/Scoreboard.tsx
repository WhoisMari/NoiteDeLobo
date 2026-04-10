import { useScoreboard } from "../../hooks/useScoreboard";
import RoundHistoryItem from "../../components/scoreboard/roundHistoryItem/RoundHistoryItem";
import AddPlayerModal from "../../components/scoreboard/addPlayerModal/AddPlayerModal";
import AddRoundModal from "../../components/scoreboard/addRoundModal/AddRoundModal";
import styles from "./Scoreboard.module.css";
import PlayerRow from "../../components/scoreboard/playerRow/PlayerRow";
import ConfirmModal from "../../components/ui/confirmModal/ConfirmModal";

export default function Scoreboard() {
  const {
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
    confirmResetRounds,
    setConfirmResetRounds,
    handleAddPlayer,
    handleDeletePlayer,
    handleOpenRound,
    handleSaveRound,
    handleDeleteRound,
    handleResetRounds,
  } = useScoreboard();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5rem",
        }}
      >
        <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className={`animate-fadeUp ${styles.page}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Scoreboard</h1>
          <p className={styles.subtitle}>
            {rounds.length} round{rounds.length !== 1 ? "s" : ""} played
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={() => setShowAddPlayer(true)}
            className={styles.addPlayerBtn}
          >
            + Player
          </button>
          {players.length > 0 && (
            <button onClick={handleOpenRound} className={styles.addRoundBtn}>
              + Round
            </button>
          )}
        </div>
      </div>

      {players.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🐺</div>
          <p className={styles.emptyText}>
            No players yet.
            <br />
            Add players to start tracking scores.
          </p>
        </div>
      ) : (
        <div className={styles.leaderboard}>
          {players.map((player, index) => (
            <PlayerRow
              key={player.id}
              player={player}
              index={index}
              maxPoints={maxPoints}
              onDeleteClick={setConfirmDeletePlayer}
            />
          ))}
        </div>
      )}

      {rounds.length > 0 && (
        <section className={styles.historySection}>
          <div className={styles.historyHeader}>
            <div className={styles.historyLabel}>Round History</div>
            <button
              onClick={() => setConfirmResetRounds(true)}
              className={styles.resetRoundsBtn}
            >
              Reset
            </button>
          </div>
          <div className={styles.historyList}>
            {rounds.map((round, i) => (
              <RoundHistoryItem
                key={round.id}
                round={round}
                roundNumber={rounds.length - i}
                isLatest={i === 0}
                onUndoClick={setConfirmDeleteRound}
              />
            ))}
          </div>
        </section>
      )}

      {confirmResetRounds && (
        <ConfirmModal
          title="Reset round history?"
          message="All round records will be cleared, but player points will be kept. This action cannot be undone."
          confirmLabel="Reset"
          onConfirm={handleResetRounds}
          onCancel={() => setConfirmResetRounds(false)}
        />
      )}

      {confirmDeletePlayer !== null && (
        <ConfirmModal
          title="Remove player?"
          message="This will permanently delete the player and all their scores. This action cannot be undone."
          confirmLabel="Remove"
          onConfirm={() => handleDeletePlayer(confirmDeletePlayer)}
          onCancel={() => setConfirmDeletePlayer(null)}
        />
      )}

      {confirmDeleteRound !== null && (
        <ConfirmModal
          title="Undo this round?"
          message="Points from this round will be reversed for all players. This action cannot be undone."
          confirmLabel="Undo Round"
          onConfirm={() => handleDeleteRound(confirmDeleteRound)}
          onCancel={() => setConfirmDeleteRound(null)}
        />
      )}

      {showAddPlayer && (
        <AddPlayerModal
          name={newPlayerName}
          onNameChange={setNewPlayerName}
          onAdd={handleAddPlayer}
          onClose={() => setShowAddPlayer(false)}
        />
      )}

      {showAddRound && (
        <AddRoundModal
          players={players}
          roundPoints={roundPoints}
          onUpdatePoints={setRoundPoints}
          onSave={handleSaveRound}
          onClose={() => setShowAddRound(false)}
        />
      )}
    </div>
  );
}
