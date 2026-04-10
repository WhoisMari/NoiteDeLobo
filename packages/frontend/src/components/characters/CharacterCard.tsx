import type { Character } from '../utils'
import styles from './CharacterCard.module.css'

interface Props {
  character: Character
  onToggle: (id: number, enabled: boolean) => void
}

export default function CharacterCard({ character, onToggle }: Props) {
  const { id, name, emoji, nightOrder, isEnabled } = character

  return (
    <button
      onClick={() => onToggle(id, !isEnabled)}
      className={`${styles.card} ${isEnabled ? styles.cardEnabled : ''}`}
    >
      {nightOrder !== null && (
        <span className={`${styles.badge} ${isEnabled ? styles.badgeEnabled : ''}`}>
          #{nightOrder}
        </span>
      )}
      <span className={`${styles.emoji} ${isEnabled ? styles.emojiEnabled : ''}`}>
        {emoji}
      </span>
      <span className={`${styles.name} ${isEnabled ? styles.nameEnabled : ''}`}>
        {name}
      </span>
      {nightOrder === null && (
        <span className={styles.dayLabel}>day only</span>
      )}
    </button>
  )
}
