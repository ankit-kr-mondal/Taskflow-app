import { getCategoryById, getPriorityById } from '../utils/taskHelpers';
import styles from './TaskCard.module.css';

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const category = getCategoryById(task.category);
  const priority = getPriorityById(task.priority);

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.left}>
        <button
          className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && <span>✓</span>}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{task.title}</span>
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={() => onEdit(task)} title="Edit">✏️</button>
            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => onDelete(task.id)} title="Delete">🗑️</button>
          </div>
        </div>

        {task.note && <p className={styles.note}>{task.note}</p>}

        <div className={styles.meta}>
          <span className={styles.categoryTag} style={{ background: category.bg, color: category.color }}>
            {category.label}
          </span>
          <span className={styles.priority} style={{ color: priority.color }}>
            ● {priority.label}
          </span>
          {task.time && (
            <span className={styles.time}>🕐 {task.time}</span>
          )}
        </div>
      </div>
    </div>
  );
}
