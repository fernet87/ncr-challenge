import './App.css';
import { useUser } from './contexts/user-context';

function App() {
  const { checkLogin } = useUser();

  return (
    <div>
      { checkLogin() }
    </div>
  );
}

export default App;
