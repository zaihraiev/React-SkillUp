import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";

function App() {
  const authState = useSelector((state) => state.auth);

  return (
    <>
      {authState.isAuthenticated && <Header />}

      {!authState.isAuthenticated && <Auth />}
      <Counter />
    </>
  );
}

export default App;
