import { useSettingsStore } from "../../store/settingsStore";
import SettingsSection from "../../components/settings/settingsSection/SettingsSection";
import Chip from "../../components/ui/chip/Chip";
import styles from "./Settings.module.css";

const AUTO_OPTIONS = [
  { label: "Manual", value: 0 },
  { label: "1s", value: 1 },
  { label: "3s", value: 3 },
  { label: "5s", value: 5 },
  { label: "10s", value: 10 },
  { label: "15s", value: 15 },
  { label: "20s", value: 20 },
  { label: "30s", value: 30 },
];

const DISCUSSION_OPTIONS = [
  { label: "1 min", value: 60 },
  { label: "2 min", value: 120 },
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
  { label: "8 min", value: 480 },
  { label: "10 min", value: 600 },
];

export default function Settings() {
  const {
    language,
    setLanguage,
    autoAdvanceSeconds,
    setAutoAdvanceSeconds,
    discussionSeconds,
    setDiscussionSeconds,
  } = useSettingsStore();

  return (
    <div className={`animate-fadeUp ${styles.page}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
      </div>

      <div className={styles.content}>
        <SettingsSection title="Narrator">
          <div className={styles.chipGroup}>
            {(["en", "pt"] as const).map((lang) => (
              <Chip
                key={lang}
                label={lang === "en" ? "🇬🇧 English" : "🇧🇷 Português"}
                active={language === lang}
                onClick={() => setLanguage(lang)}
              />
            ))}
          </div>
        </SettingsSection>

        <SettingsSection
          title="Auto-advance"
          description="Automatically move to the next role after the set time. Manual requires you to tap Next."
        >
          <div className={styles.chipGroupWrap}>
            {AUTO_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                active={autoAdvanceSeconds === opt.value}
                onClick={() => setAutoAdvanceSeconds(opt.value)}
              />
            ))}
          </div>
        </SettingsSection>

        <SettingsSection
          title="Discussion Timer"
          description="How long players have to discuss before the vote countdown."
        >
          <div className={styles.chipGroupWrap}>
            {DISCUSSION_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                active={discussionSeconds === opt.value}
                onClick={() => setDiscussionSeconds(opt.value)}
              />
            ))}
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
