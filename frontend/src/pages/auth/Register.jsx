import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../../services/userService";
import { Button } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";

function Register() {
  const { createNotification } = useNotification();
  const { setUser, setToken } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const updateForm = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await register(form);

      setUser(result.user);
      setToken(result.token);

      navigate("/");
    } catch (error) {
      createNotification("error", error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-100">
        <h2 className="mb-2 text-5xl uppercase">Register</h2>
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
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-md border border-gray-200 p-1 text-sm text-neutral-500 outline-none"
                value={form.email}
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
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
