import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.sheet} animate-fadeUp`}
      >
        {children}
      </div>
    </div>
  );
}
