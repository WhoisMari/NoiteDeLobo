import { useSettingsStore } from '../../../store/settingsStore'
import styles from './LanguageToggle.module.css'

export default function LanguageToggle() {
  const { language, setLanguage } = useSettingsStore()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
      title="Toggle language"
      className={styles.btn}
    >
      {language === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}
    </button>
  )
}
