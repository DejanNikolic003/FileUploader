import { useState } from "react";
import { API_URL } from "../../utils/config";
import { useNavigate } from "react-router";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "success",
    text: "",
  });

  const navigate = useNavigate();

  const updateForm = (e, key) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const submitForm = () => {
    console.log("Test changed");
    navigate("/login");
    // try {
    //   const request = await fetch(`${API_URL}/register`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: form.username,
    //       email: form.email,
    //       password: form.password,
    //     }),
    //   });

    //   const response = await request.json();

    //   setMessage({
    //     type: "success",
    //     text: response.message,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   setMessage({
    //     type: "error",
    //     text: error.message,
    //   });
    // }
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
        <h2 className="mb-2 text-5xl uppercase">Register</h2>
        {message && (
          <span
            className={
              message.type === "error" ? "text-red-500" : "text-emerald-500"
            }
          >
            {message.text}
          </span>
        )}
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
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-md border border-gray-200 p-1 text-sm text-neutral-500 outline-none"
                value={form.email}
                onChange={(e) => updateForm(e, "email")}
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
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
