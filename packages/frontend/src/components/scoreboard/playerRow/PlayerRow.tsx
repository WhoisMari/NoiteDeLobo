import styles from "./PlayerRow.module.css";
import { PlayerRowProps } from "./utils/types";

export default function PlayerRow({
  player,
  index,
  maxPoints,
  onDeleteClick,
}: PlayerRowProps) {
  const isFirst = index === 0;
  const barWidth = maxPoints > 0 ? (player.totalPoints / maxPoints) * 100 : 0;

  return (
    <div className={`${styles.row} ${isFirst ? styles.rowFirst : ""}`}>
      {player.totalPoints > 0 && (
        <div
          className={`${styles.scoreBar} ${isFirst ? styles.scoreBarFirst : ""}`}
          style={{ width: `${barWidth}%` }}
        />
      )}
      <div className={styles.inner}>
        <span className={`${styles.rank} ${isFirst ? styles.rankFirst : ""}`}>
          {isFirst ? "🏆" : index + 1}
        </span>
        <span className={styles.name}>{player.name}</span>
        <span
          className={`${styles.points} ${isFirst ? styles.pointsFirst : ""}`}
        >
          {player.totalPoints}
          <span className={styles.pointsSuffix}>pts</span>
        </span>
        <button
          className={styles.deleteBtn}
          onClick={() => onDeleteClick(player.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
