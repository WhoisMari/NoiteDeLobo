import { useNarratorPage, formatTime } from "../../hooks/useNarratorPage";
import PrimaryButton from "../../components/ui/primaryButton/PrimaryButton";
import styles from "./Narrator.module.css";

export default function Narrator() {
  const {
    steps,
    currentIndex,
    phase,
    start,
    setPhase,
    language,
    autoAdvanceSeconds,
    discussionSeconds,
    autoTimeLeft,
    votePhase,
    setVotePhase,
    voteSecondsLeft,
    finalCount,
    setFinalCount,
    dawnReady,
    currentStep,
    hint,
    isAudioPhase,
    handleStop,
    startVote,
    reset,
  } = useNarratorPage();

  if (steps.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🃏</span>
        <p className={styles.emptyText}>
          No roles with night actions are enabled.
          <br />
          Go to <strong>Roles</strong> to enable some.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Noite de Lobo</h1>
          {phase !== "idle" && phase !== "done" && (
            <p className={styles.headerMeta}>Night Phase</p>
          )}
        </div>
        {(phase === "waking" || phase === "active" || phase === "sleeping") && (
          <div className={styles.headerRight}>
            <span className={styles.stepCount}>
              {currentIndex + 1} / {steps.length}
            </span>
            <button onClick={handleStop} className={styles.stopBtn}>
              ✕ Stop
            </button>
          </div>
        )}
      </div>

      <div className={styles.main}>
        {phase === "idle" && (
          <div className={`animate-fadeUp ${styles.idleContainer}`}>
            <div className={styles.idleHero}>
              <div className={styles.idleEmoji}>🌙</div>
              <h2 className={styles.idleTitle}>Ready to begin</h2>
              <p className={styles.idleSubtitle}>
                {steps.length} role{steps.length !== 1 ? "s" : ""} will be
                narrated tonight
              </p>
            </div>

            <div className={styles.chipList}>
              {steps.map((s) => (
                <span key={s.character.id} className={styles.roleChip}>
                  {s.character.emoji} {s.character.name}
                </span>
              ))}
            </div>

            <PrimaryButton onClick={start} fullWidth>
              Start Night
            </PrimaryButton>
          </div>
        )}

        {(phase === "waking" || phase === "active" || phase === "sleeping") &&
          currentStep && (
            <div className={`animate-scaleIn ${styles.activeContainer}`}>
              <div className={styles.progressDots}>
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.dot} ${
                      i < currentIndex
                        ? styles.dotPast
                        : i === currentIndex
                          ? styles.dotCurrent
                          : styles.dotFuture
                    }`}
                    style={{ width: i === currentIndex ? "22px" : "6px" }}
                  />
                ))}
              </div>

              <div
                className={`${styles.roleCard} ${phase === "active" ? styles.roleCardActive : ""}`}
              >
                <div
                  className={`${styles.roleEmoji} ${phase === "active" ? styles.roleEmojiActive : ""}`}
                >
                  {currentStep.character.emoji}
                </div>

                <div className={styles.roleName}>
                  {currentStep.character.name}
                </div>

                <div
                  className={`${styles.phaseLabel} ${isAudioPhase ? styles.phaseLabelAudio : ""}`}
                >
                  {isAudioPhase && <span className={styles.phaseDot} />}
                  {phase === "waking" && "Playing wake cue"}
                  {phase === "sleeping" && "Playing sleep cue"}
                  {phase === "active" &&
                    !autoAdvanceSeconds &&
                    "Eyes open — perform your action"}
                </div>

                {phase === "active" && hint && (
                  <div className={styles.roleHint}>{hint[language]}</div>
                )}
              </div>

              {phase === "active" && autoAdvanceSeconds > 0 && (
                <div className={styles.autoBar}>
                  <div className={styles.autoBarHeader}>
                    <span className={styles.autoBarLabel}>Auto-advancing</span>
                    <span className={styles.autoBarTime}>{autoTimeLeft}s</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${(autoTimeLeft / autoAdvanceSeconds) * 100}%`,
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setPhase("sleeping")}
                    className={styles.ghostBtn}
                  >
                    Skip →
                  </button>
                </div>
              )}

              {phase === "active" && autoAdvanceSeconds === 0 && (
                <PrimaryButton onClick={() => setPhase("sleeping")} fullWidth>
                  Next →
                </PrimaryButton>
              )}
            </div>
          )}

        {phase === "done" && votePhase === "idle" && (
          <div className={`animate-fadeUp ${styles.doneContainer}`}>
            <div className={styles.dawnEmoji}>☀️</div>
            <div>
              <h2 className={styles.dawnTitle}>Night is over</h2>
              {!dawnReady ? (
                <div className={styles.dawnWaiting}>
                  <span className={styles.phaseDot} />
                  Everyone, wake up...
                </div>
              ) : (
                <p className={styles.dawnReady}>Time to discuss.</p>
              )}
            </div>
            {dawnReady && (
              <div className={styles.dawnActions}>
                <PrimaryButton onClick={startVote} fullWidth>
                  🗳️ Start Discussion · {formatTime(discussionSeconds)}
                </PrimaryButton>
                <button onClick={reset} className={styles.ghostBtn}>
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "done" && votePhase === "countdown" && (
          <div className={`animate-fadeIn ${styles.voteContainer}`}>
            <p className={styles.voteLabel}>Discuss — vote when timer ends</p>

            <div
              className={`${styles.voteTimer} ${voteSecondsLeft <= 30 ? styles.voteTimerUrgent : ""}`}
            >
              {formatTime(voteSecondsLeft)}
            </div>

            <div className={styles.barTrack}>
              <div
                className={`${styles.voteBarFill} ${voteSecondsLeft <= 30 ? styles.voteBarFillUrgent : ""}`}
                style={{
                  width: `${(voteSecondsLeft / discussionSeconds) * 100}%`,
                }}
              />
            </div>

            <button
              onClick={() => {
                setVotePhase("finale");
                setFinalCount(3);
              }}
              className={styles.ghostBtn}
            >
              Skip to vote
            </button>
          </div>
        )}

        {phase === "done" && votePhase === "finale" && (
          <div
            key={finalCount}
            className={`animate-countIn ${styles.finaleContainer}`}
          >
            <span className={styles.finaleNumber}>{finalCount}</span>
          </div>
        )}

        {phase === "done" && votePhase === "voted" && (
          <div className={`animate-scaleIn ${styles.votedContainer}`}>
            <div className={styles.votedText}>VOTE!</div>
            <p className={styles.votedSubtitle}>
              Point at who you think is the Werewolf
            </p>
            <button onClick={reset} className={styles.ghostBtn}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
