import styles from './Chip.module.css'

interface Props {
  label: string
  active: boolean
  onClick: () => void
}

export default function Chip({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles.chip} ${active ? styles.active : ''}`}
    >
      {label}
    </button>
  )
}
