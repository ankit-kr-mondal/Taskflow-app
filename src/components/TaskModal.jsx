import { useState, useEffect } from 'react';
import { CATEGORIES, PRIORITIES, toDateStr } from '../utils/taskHelpers';
import styles from './TaskModal.module.css';

export default function TaskModal({ isOpen, onClose, onSave, editTask, defaultDate }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState(defaultDate || toDateStr(new Date()));
  const [time, setTime] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setNote(editTask.note || '');
      setCategory(editTask.category);
      setPriority(editTask.priority);
      setDate(editTask.date);
      setTime(editTask.time || '');
    } else {
      setTitle(''); setNote('');
      setCategory('work'); setPriority('medium');
      setDate(defaultDate || toDateStr(new Date())); setTime('');
    }
  }, [editTask, defaultDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), note: note.trim(), category, priority, date, time });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{editTask ? 'Edit Task' : 'New Task'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Task Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              required
            />
          </div>

          <div className={styles.field}>
            <label>Notes</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add details (optional)..."
              rows={2}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <div className={styles.chipGroup}>
              {CATEGORIES.map(c => (
                <button
                  type="button"
                  key={c.id}
                  className={`${styles.chip} ${category === c.id ? styles.chipActive : ''}`}
                  style={category === c.id ? { background: c.bg, color: c.color, borderColor: c.color } : {}}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label>Priority</label>
            <div className={styles.chipGroup}>
              {PRIORITIES.map(p => (
                <button
                  type="button"
                  key={p.id}
                  className={`${styles.chip} ${priority === p.id ? styles.chipActive : ''}`}
                  style={priority === p.id ? { background: p.color + '20', color: p.color, borderColor: p.color } : {}}
                  onClick={() => setPriority(p.id)}
                >
                  ● {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>
              {editTask ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
