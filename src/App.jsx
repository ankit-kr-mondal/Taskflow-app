import { useLocalStorage } from './hooks/useLocalStorage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

export default function App() {
  const [userName, setUserName] = useLocalStorage('taskflow_user', null);

  const handleLogin = (name) => setUserName(name);
  const handleLogout = () => {
    if (window.confirm('Sign out? Your tasks will remain saved.')) {
      setUserName(null);
    }
  };

  if (!userName) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard userName={userName} onLogout={handleLogout} />;
}
