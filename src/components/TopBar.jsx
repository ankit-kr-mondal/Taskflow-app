import styles from './TopBar.module.css';

const VIEW_LABELS = {
  today: '☀️ Today',
  week: '📆 This Week',
  month: '🗓️ This Month',
};

export default function TopBar({ activeView, userName, onMenuToggle }) {
  return (
    <header className={styles.topBar}>
      <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Open menu">
        <span /><span /><span />
      </button>
      <div className={styles.center}>
        <span className={styles.viewLabel}>{VIEW_LABELS[activeView]}</span>
      </div>
      <div className={styles.avatar}>
        {userName.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}
