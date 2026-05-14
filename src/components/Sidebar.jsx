import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'today', label: 'Today', icon: '☀️' },
  { id: 'week', label: 'This Week', icon: '📆' },
  { id: 'month', label: 'This Month', icon: '🗓️' },
];

export default function Sidebar({ activeView, onViewChange, userName, onLogout, taskCounts }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span>⚡</span>
        <span className={styles.logoText}>Taskflow</span>
      </div>

      <div className={styles.userBox}>
        <div className={styles.avatar}>
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.userSub}>Your workspace</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLabel}>Planner</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeView === item.id ? styles.active : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navText}>{item.label}</span>
            {taskCounts[item.id] > 0 && (
              <span className={styles.badge}>{taskCounts[item.id]}</span>
            )}
          </button>
        ))}
      </nav>

      <button className={styles.logoutBtn} onClick={onLogout}>
        <span>🚪</span>
        <span>Sign Out</span>
      </button>
    </aside>
  );
}
