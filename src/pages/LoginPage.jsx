import { useState } from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name to continue');
      return;
    }
    onLogin(trimmed);
  };

  return (
    <div className={styles.container}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>Taskflow</span>
        </div>

        <div className={styles.heroText}>
          <h1>Manage Your<br /><span>Daily Tasks</span></h1>
          <p>Stay organized, hit your goals, and own every day.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">What should we call you?</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              placeholder="Enter your name..."
              autoFocus
              className={error ? styles.inputError : ''}
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>

          <button type="submit" className={styles.btn}>
            Get Started →
          </button>
        </form>

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <span>📅</span>
            <span>Day / Week / Month planner</span>
          </div>
          <div className={styles.featureItem}>
            <span>🎯</span>
            <span>Priority tracking</span>
          </div>
          <div className={styles.featureItem}>
            <span>💾</span>
            <span>Auto-saved locally</span>
          </div>
        </div>
      </div>
    </div>
  );
}
