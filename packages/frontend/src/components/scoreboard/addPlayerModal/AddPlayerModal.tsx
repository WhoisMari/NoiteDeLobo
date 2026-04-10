import Modal from "../../ui/modal/Modal";
import styles from "./AddPlayerModal.module.css";
import { AddPlayerModalProps } from "./utils/types";

export default function AddPlayerModal({
  name,
  onNameChange,
  onAdd,
  onClose,
}: AddPlayerModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2 className={styles.title}>Add Player</h2>
      <input
        autoFocus
        type="text"
        placeholder="Player name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        className={styles.input}
      />
      <div className={styles.actions}>
        <button onClick={onClose} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={onAdd} className={styles.addBtn}>
          Add
        </button>
      </div>
    </Modal>
  );
}
