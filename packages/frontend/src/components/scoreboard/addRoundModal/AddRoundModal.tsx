import Modal from "../../ui/modal/Modal";
import styles from "./AddRoundModal.module.css";
import { AddRoundModalProps } from "./utils/types";

export default function AddRoundModal({
  players,
  roundPoints,
  onUpdatePoints,
  onSave,
  onClose,
}: AddRoundModalProps) {
  const decrement = (id: number) =>
    onUpdatePoints((p) => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) - 1) }));

  const increment = (id: number) =>
    onUpdatePoints((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.title}>Record Round</h2>
      <p className={styles.subtitle}>
        Enter points for each player this round.
      </p>
      <div className={styles.playerList}>
        {players.map((player) => (
          <div key={player.id} className={styles.playerRow}>
            <span className={styles.playerName}>{player.name}</span>
            <div className={styles.controls}>
              <button
                className={styles.counterBtn}
                onClick={() => decrement(player.id)}
              >
                −
              </button>
              <span className={styles.counterValue}>
                {roundPoints[player.id] ?? 0}
              </span>
              <button
                className={styles.counterBtn}
                onClick={() => increment(player.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button onClick={onClose} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={onSave} className={styles.saveBtn}>
          Save
        </button>
      </div>
    </Modal>
  );
}
