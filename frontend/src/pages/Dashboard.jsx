import { useAuth } from "../contexts/AuthContext";
import Navbar from "./components/Navbar";

function Dashboard() {
  const { user } = useAuth();
  return (
    <section className="pt-5">
      <div className="container mx-auto">
        {user ? <h1>Welcome back, {user?.username}</h1> : <h1>Login.</h1>}
      </div>
    </section>
  );
}

export default Dashboard;
