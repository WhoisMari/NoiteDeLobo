import styles from './SettingsSection.module.css'

interface Props {
  title: string
  description?: string
  children: React.ReactNode
}

export default function SettingsSection({ title, description, children }: Props) {
  return (
    <div className={styles.section}>
      <div>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {children}
    </div>
  )
}
