import { Link, NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user } = useAuth();
  return (
    <div className="w-full bg-gray-100 p-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo text-2xl font-bold tracking-wide uppercase">
          <Link to="/">FileUploader</Link>
        </div>
        <nav>
          <ul className="space-x-2 uppercase">
            {user ? (
              <NavLink
                to="/folders"
                className={({ isActive, isPending }) =>
                  isActive ? "text-emerald-500" : ""
                }
              >
                Folders
              </NavLink>
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
