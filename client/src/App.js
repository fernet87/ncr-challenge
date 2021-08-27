import { useSession } from './contexts/user-context';

function App() {
  const { checkLogin } = useSession();

  return (
    <div>
      { checkLogin() }
    </div>
  );
}

export default App;
