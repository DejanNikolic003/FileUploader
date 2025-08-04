import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ProtectedRoute } from "./utils/ProtectedRoute.jsx";
import Folders from "./pages/Folders.jsx";
import Folder from "./pages/Folder.jsx";
import { NotificationProvider } from "./contexts/NotificationProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/folders",
    element: <Folders />,
  },
  {
    path: "/folders/:id",
    element: <Folder />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>,
);
