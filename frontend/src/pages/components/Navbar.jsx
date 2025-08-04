import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "antd";

function Navbar() {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setUser(null);
    setToken(null);

    navigate("/login");
  };

  return (
    <div className="w-full bg-gray-100 p-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo text-2xl font-bold tracking-wide uppercase">
          <Link to="/">FileUploader</Link>
        </div>
        <nav>
          <ul className="space-x-2">
            {user ? (
              <div className="space-x-3">
                <NavLink
                  to="/folders"
                  className={({ isActive, isPending }) =>
                    isActive ? "text-emerald-500" : ""
                  }
                >
                  Folders
                </NavLink>
                <Button color="danger" variant="solid" onClick={handleClick}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="transition hover:text-emerald-500"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="transition hover:text-emerald-500"
                >
                  Register
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
