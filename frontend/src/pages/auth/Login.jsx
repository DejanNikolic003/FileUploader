import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../services/userService";
import { Button } from "antd";
import { useNotification } from "../../contexts/NotificationContext";

function Login() {
  const { createNotification } = useNotification();
  const navigate = useNavigate();

  const { setUser, setToken } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const updateForm = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await login(form);

      setUser(result.user);
      setToken(result.token);

      navigate("/");
    } catch (error) {
      createNotification("error", error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
        <h2 className="mb-2 text-5xl uppercase">Login</h2>

        <div className="w-full max-w-md rounded-md bg-white p-3 shadow-sm">
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                className="w-full rounded-md border border-gray-200 p-1 text-sm text-neutral-500 outline-none"
                value={form.username}
                onChange={(event) => updateForm(event)}
              />
            </div>
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                className="w-full rounded-md border border-gray-200 p-1 text-sm text-neutral-500 outline-none"
                value={form.password}
                onChange={(event) => updateForm(event)}
              />
            </div>
            <Button htmlType="submit" type="primary" className="w-full p-3">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
