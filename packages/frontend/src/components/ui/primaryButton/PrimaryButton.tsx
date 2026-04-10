import styles from './PrimaryButton.module.css'

interface Props {
  onClick: () => void
  children: React.ReactNode
  fullWidth?: boolean
}

export default function PrimaryButton({ onClick, children, fullWidth }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${fullWidth ? styles.fullWidth : ''}`}
    >
      {children}
    </button>
  )
}
