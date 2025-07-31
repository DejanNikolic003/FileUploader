import "./App.css";
import Navbar from "./pages/components/Navbar";
import Dashboard from "./pages/Dashboard";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}

export default App;
