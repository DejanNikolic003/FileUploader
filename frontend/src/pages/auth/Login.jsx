import { useNavigate } from "react-router";
import { API_URL } from "../../utils/config";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { setToken, setUser } = useAuth();

  const navigate = useNavigate();

  const updateForm = (e, key) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const submitForm = async () => {
    try {
      const request = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const response = await request.json();

      if (!request.ok) {
        console.log("NEM!");
        return;
      }

      setToken(response.token);
      setUser(response.user);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const request = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const response = await request.json();

      console.log(response);

      setToken(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
        <h2 className="mb-2 text-5xl uppercase">Login</h2>

        <div className="w-full max-w-md rounded-md bg-white p-3 shadow-sm">
          <form className="space-y-2">
            <div>
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                className="w-full rounded-md border border-gray-200 p-1 text-sm text-neutral-500 outline-none"
                value={form.username}
                onChange={(e) => updateForm(e, "username")}
              />
            </div>
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                className="w-full rounded-md border border-gray-200 p-1 text-sm text-neutral-500 outline-none"
                value={form.password}
                onChange={(e) => updateForm(e, "password")}
              />
            </div>
            <button
              type="button"
              className="w-full cursor-pointer rounded-md bg-emerald-500 p-2 text-white uppercase transition-all duration-300 hover:bg-emerald-600"
              onClick={() => submitForm()}
            >
              Login
            </button>
            <button
              type="button"
              className="w-full cursor-pointer rounded-md bg-emerald-500 p-2 text-white uppercase transition-all duration-300 hover:bg-emerald-600"
              onClick={() => logout()}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
