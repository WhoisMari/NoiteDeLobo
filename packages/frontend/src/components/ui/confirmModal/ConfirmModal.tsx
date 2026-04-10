import Modal from "../modal/Modal";
import styles from "./ConfirmModal.module.css";

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal onClose={onCancel}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={onConfirm} className={styles.confirmBtn}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
