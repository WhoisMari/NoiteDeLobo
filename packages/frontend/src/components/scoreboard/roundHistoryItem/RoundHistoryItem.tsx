import styles from "./RoundHistoryItem.module.css";
import { RoundHistoryItemProps } from "./utils/types";

export default function RoundHistoryItem({
  round,
  roundNumber,
  isLatest,
  onUndoClick,
}: RoundHistoryItemProps) {
  const scoredPlayers = round.scores.filter((s) => s.points > 0);

  return (
    <div className={styles.row}>
      <div className={styles.header}>
        <span className={styles.roundLabel}>Round {roundNumber}</span>
        {isLatest && (
          <button
            className={styles.undoBtn}
            onClick={() => onUndoClick(round.id)}
          >
            Undo
          </button>
        )}
      </div>
      <div className={styles.scores}>
        {scoredPlayers.length > 0 ? (
          scoredPlayers.map((s) => (
            <span key={s.id} className={styles.scoreTag}>
              {s.player.name} +{s.points}
            </span>
          ))
        ) : (
          <span className={styles.emptyLabel}>No points scored</span>
        )}
      </div>
    </div>
  );
}
