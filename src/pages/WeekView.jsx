import { useState } from 'react';
import { toDateStr, getTasksForDate } from '../utils/taskHelpers';
import TaskCard from '../components/TaskCard';
import StatsBar from '../components/StatsBar';
import styles from './WeekView.module.css';

function getWeekStart(date) {
  const d = new Date(date + 'T00:00:00');
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return toDateStr(d);
}

function getWeekDays(weekStart) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart + 'T00:00:00');
    d.setDate(d.getDate() + i);
    return toDateStr(d);
  });
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeekView({ tasks, onAdd, onToggle, onDelete, onEdit }) {
  const todayStr = toDateStr(new Date());
  const [weekStart, setWeekStart] = useState(getWeekStart(todayStr));
  const [selectedDay, setSelectedDay] = useState(todayStr);

  const days = getWeekDays(weekStart);
  const weekTasks = tasks.filter(t => days.includes(t.date));
  const selectedTasks = getTasksForDate(tasks, selectedDay);

  const shiftWeek = (n) => {
    const d = new Date(weekStart + 'T00:00:00');
    d.setDate(d.getDate() + n * 7);
    const ns = toDateStr(d);
    setWeekStart(ns);
    setSelectedDay(getWeekDays(ns)[0]);
  };

  const weekLabel = () => {
    const start = new Date(days[0] + 'T00:00:00');
    const end = new Date(days[6] + 'T00:00:00');
    const opts = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
  };

  return (
    <div className={styles.container}>
      {/* Week navigator */}
      <div className={styles.weekNav}>
        <button className={styles.navArrow} onClick={() => shiftWeek(-1)}>‹</button>
        <span className={styles.weekLabel}>📆 {weekLabel()}</span>
        <button className={styles.navArrow} onClick={() => shiftWeek(1)}>›</button>
      </div>

      {/* Day strip */}
      <div className={styles.dayStrip}>
        {days.map((day, i) => {
          const count = getTasksForDate(tasks, day).length;
          const isSelected = day === selectedDay;
          const isToday = day === todayStr;
          return (
            <button
              key={day}
              className={`${styles.dayBtn} ${isSelected ? styles.dayActive : ''} ${isToday && !isSelected ? styles.dayToday : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              <span className={styles.dayName}>{DAY_LABELS[i]}</span>
              <span className={styles.dayNum}>{parseInt(day.split('-')[2])}</span>
              {count > 0 && <span className={styles.dayDot} />}
            </button>
          );
        })}
      </div>

      <StatsBar tasks={weekTasks} />

      <div className={styles.dayHeader}>
        <h3>
          {selectedDay === todayStr ? 'Today' : new Date(selectedDay + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h3>
        <button className={styles.addBtn} onClick={() => onAdd(selectedDay)}>+ Add</button>
      </div>

      {selectedTasks.length === 0 ? (
        <div className={styles.empty}>
          <span>🌿</span>
          <p>No tasks — enjoy the free time!</p>
        </div>
      ) : (
        <div className={styles.taskList}>
          {selectedTasks.map(task => (
            <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
