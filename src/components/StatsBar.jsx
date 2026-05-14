import styles from './StatsBar.module.css';

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const pending = total - done;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <span className={styles.num}>{total}</span>
        <span className={styles.label}>Total</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={styles.num} style={{ color: '#FF6B6B' }}>{pending}</span>
        <span className={styles.label}>Pending</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={styles.num} style={{ color: '#43E97B' }}>{done}</span>
        <span className={styles.label}>Done</span>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressLabel}>{percent}% complete</div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
