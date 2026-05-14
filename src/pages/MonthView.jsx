import { useState } from 'react';
import { toDateStr, getTasksForDate, getTasksForMonth } from '../utils/taskHelpers';
import TaskCard from '../components/TaskCard';
import StatsBar from '../components/StatsBar';
import styles from './MonthView.module.css';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Mon=0
  const days = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export default function MonthView({ tasks, onAdd, onToggle, onDelete, onEdit }) {
  const today = new Date();
  const todayStr = toDateStr(today);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(todayStr);

  const calDays = getCalendarDays(year, month);
  const monthTasks = getTasksForMonth(tasks, year, month);
  const selectedTasks = getTasksForDate(tasks, selectedDay);

  const shiftMonth = (n) => {
    let m = month + n, y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setMonth(m); setYear(y);
    setSelectedDay(toDateStr(new Date(y, m, 1)));
  };

  return (
    <div className={styles.container}>
      {/* Month navigator */}
      <div className={styles.monthNav}>
        <button className={styles.navArrow} onClick={() => shiftMonth(-1)}>‹</button>
        <span className={styles.monthLabel}>🗓️ {MONTH_NAMES[month]} {year}</span>
        <button className={styles.navArrow} onClick={() => shiftMonth(1)}>›</button>
      </div>

      <StatsBar tasks={monthTasks} />

      {/* Calendar grid */}
      <div className={styles.calendar}>
        {DAY_LABELS.map(d => (
          <div key={d} className={styles.calHeader}>{d}</div>
        ))}
        {calDays.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className={styles.calEmpty} />;
          const ds = toDateStr(date);
          const dayTasks = getTasksForDate(tasks, ds);
          const done = dayTasks.filter(t => t.completed).length;
          const isSelected = ds === selectedDay;
          const isToday = ds === todayStr;
          return (
            <button
              key={ds}
              className={`${styles.calDay} ${isSelected ? styles.calSelected : ''} ${isToday ? styles.calToday : ''}`}
              onClick={() => setSelectedDay(ds)}
            >
              <span className={styles.calNum}>{date.getDate()}</span>
              {dayTasks.length > 0 && (
                <div className={styles.calDots}>
                  {dayTasks.slice(0, 3).map((_, idx) => (
                    <span key={idx} className={`${styles.calDot} ${idx < done ? styles.calDotDone : ''}`} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day tasks */}
      <div className={styles.daySection}>
        <div className={styles.dayHeader}>
          <h3>
            {selectedDay === todayStr ? 'Today' : new Date(selectedDay + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </h3>
          <button className={styles.addBtn} onClick={() => onAdd(selectedDay)}>+ Add Task</button>
        </div>

        {selectedTasks.length === 0 ? (
          <div className={styles.empty}>
            <span>☀️</span>
            <p>Nothing scheduled — enjoy!</p>
          </div>
        ) : (
          <div className={styles.taskList}>
            {selectedTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
