export const CATEGORIES = [
  { id: 'work', label: 'Work', color: '#6C63FF', bg: '#EDE9FF' },
  { id: 'personal', label: 'Personal', color: '#FF6B6B', bg: '#FFE8E8' },
  { id: 'health', label: 'Health', color: '#43E97B', bg: '#E0FFF0' },
  { id: 'learning', label: 'Learning', color: '#FFB347', bg: '#FFF3E0' },
  { id: 'social', label: 'Social', color: '#38F9D7', bg: '#E0FDFB' },
];

export const PRIORITIES = [
  { id: 'high', label: 'High', color: '#FF6B6B' },
  { id: 'medium', label: 'Medium', color: '#FFB347' },
  { id: 'low', label: 'Low', color: '#43E97B' },
];

export function createTask({ title, note = '', category = 'work', priority = 'medium', date, time = '' }) {
  return {
    id: crypto.randomUUID(),
    title,
    note,
    category,
    priority,
    date, // ISO date string YYYY-MM-DD
    time,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function getTasksForDate(tasks, dateStr) {
  return tasks.filter(t => t.date === dateStr);
}

export function getTasksForWeek(tasks, weekStart) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return toDateStr(d);
  });
  return tasks.filter(t => days.includes(t.date));
}

export function getTasksForMonth(tasks, year, month) {
  return tasks.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

export function toDateStr(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}

export function getPriorityById(id) {
  return PRIORITIES.find(p => p.id === id) || PRIORITIES[1];
}
