import { useState } from 'react';
import { toDateStr, getTasksForDate, formatDisplayDate } from '../utils/taskHelpers';
import TaskCard from '../components/TaskCard';
import StatsBar from '../components/StatsBar';
import styles from './TodayView.module.css';

export default function TodayView({ tasks, onAdd, onToggle, onDelete, onEdit }) {
  const [selectedDate, setSelectedDate] = useState(toDateStr(new Date()));
  const todayStr = toDateStr(new Date());
  const dayTasks = getTasksForDate(tasks, selectedDate);
  const pending = dayTasks.filter(t => !t.completed);
  const completed = dayTasks.filter(t => t.completed);

  const isToday = selectedDate === todayStr;

  const shiftDay = (n) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + n);
    setSelectedDate(toDateStr(d));
  };

  return (
    <div className={styles.container}>
      {/* Date navigator */}
      <div className={styles.dateNav}>
        <button className={styles.navArrow} onClick={() => shiftDay(-1)}>‹</button>
        <div className={styles.dateCenter}>
          <span className={styles.dateLabel}>
            {isToday ? '📅 Today' : formatDisplayDate(selectedDate)}
          </span>
          {!isToday && (
            <button className={styles.todayLink} onClick={() => setSelectedDate(todayStr)}>
              Back to today
            </button>
          )}
        </div>
        <button className={styles.navArrow} onClick={() => shiftDay(1)}>›</button>
      </div>

      {/* Date picker */}
      <div className={styles.datePicker}>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>

      <StatsBar tasks={dayTasks} />

      <button className={styles.addBtn} onClick={() => onAdd(selectedDate)}>
        <span>+</span> Add Task
      </button>

      {dayTasks.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🎯</div>
          <p>No tasks for this day</p>
          <span>Click "Add Task" to get started!</span>
        </div>
      ) : (
        <>
          {pending.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.dot} style={{ background: '#FF6B6B' }} />
                Pending ({pending.length})
              </h3>
              <div className={styles.taskList}>
                {pending.map(task => (
                  <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
                ))}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.dot} style={{ background: '#43E97B' }} />
                Completed ({completed.length})
              </h3>
              <div className={styles.taskList}>
                {completed.map(task => (
                  <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
