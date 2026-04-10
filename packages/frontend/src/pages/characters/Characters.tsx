import { useCharacters } from "../../hooks/useCharacters";
import CharacterCard from "../../components/characters/CharacterCard";
import styles from "./Characters.module.css";

export default function Characters() {
  const { loading, nightRoles, dayRoles, enabledCount, handleToggle } =
    useCharacters();

  if (loading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>Loading...</span>
      </div>
    );
  }

  return (
    <div className={`animate-fadeUp ${styles.page}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Roles</h1>
        <p className={styles.subtitle}>
          {enabledCount} night role{enabledCount !== 1 ? "s" : ""} active
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>Night Actions</div>
        <div className={styles.grid}>
          {nightRoles.map((c) => (
            <CharacterCard key={c.id} character={c} onToggle={handleToggle} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>Day-Only Roles</div>
        <div className={styles.grid}>
          {dayRoles.map((c) => (
            <CharacterCard key={c.id} character={c} onToggle={handleToggle} />
          ))}
        </div>
      </section>
    </div>
  );
}
