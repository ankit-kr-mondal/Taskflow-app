import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import TaskModal from '../components/TaskModal';
import TodayView from './TodayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createTask, toDateStr, getTasksForDate, getTasksForMonth } from '../utils/taskHelpers';
import styles from './Dashboard.module.css';

function getWeekStart(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
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

export default function Dashboard({ userName, onLogout }) {
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks', []);
  const [activeView, setActiveView] = useState('today');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [modalDefaultDate, setModalDefaultDate] = useState(toDateStr(new Date()));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const todayStr = toDateStr(new Date());
  const now = new Date();

  const taskCounts = {
    today: getTasksForDate(tasks, todayStr).filter(t => !t.completed).length,
    week: tasks.filter(t => getWeekDays(getWeekStart(todayStr)).includes(t.date) && !t.completed).length,
    month: getTasksForMonth(tasks, now.getFullYear(), now.getMonth()).filter(t => !t.completed).length,
  };

  const openAddModal = (date) => {
    setEditTask(null);
    setModalDefaultDate(date || todayStr);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editTask) {
      setTasks(prev => prev.map(t => t.id === editTask.id ? { ...t, ...data } : t));
    } else {
      setTasks(prev => [createTask(data), ...prev]);
    }
  };

  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const viewProps = { tasks, onAdd: openAddModal, onToggle: handleToggle, onDelete: handleDelete, onEdit: openEditModal };

  return (
    <div className={styles.layout}>
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      <div className={`${styles.sidebarWrap} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar
          activeView={activeView}
          onViewChange={(v) => { setActiveView(v); setSidebarOpen(false); }}
          userName={userName}
          onLogout={onLogout}
          taskCounts={taskCounts}
        />
      </div>

      <div className={styles.main}>
        <TopBar activeView={activeView} userName={userName} onMenuToggle={() => setSidebarOpen(o => !o)} />

        <div className={styles.content}>
          {/* Page heading */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.greeting}>Hello, {userName} 👋</h1>
              <p className={styles.subGreeting}>
                {taskCounts[activeView] > 0
                  ? `${taskCounts[activeView]} task${taskCounts[activeView] > 1 ? 's' : ''} pending`
                  : 'All caught up!'}
              </p>
            </div>
          </div>

          {activeView === 'today' && <TodayView {...viewProps} />}
          {activeView === 'week' && <WeekView {...viewProps} />}
          {activeView === 'month' && <MonthView {...viewProps} />}
        </div>
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null); }}
        onSave={handleSave}
        editTask={editTask}
        defaultDate={modalDefaultDate}
      />
    </div>
  );
}
