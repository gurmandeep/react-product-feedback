import { createBrowserRouter, redirect } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feeback";
import FeedbackDetail from "./pages/FeedbackDetail";
import AppLayout from "./layout/AppLayout";

const guest = () => {
  const token = localStorage.getItem("token");
  if (token) {
    throw redirect("/dashboard");
  }
  return null;
};

const auth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "*",
    loader: () => {
      throw redirect("/");
    },
  },
  { path: "/", loader: guest, Component: Login },
  { path: "/register", loader: guest, Component: Register },
  {
    Component: AppLayout,
    children: [
      { path: "/dashboard", loader: auth, Component: Dashboard },
      { path: "/feedback", loader: auth, Component: Feedback },
      { path: "/feedback/:id", loader: auth, Component: FeedbackDetail },
      { path: "/logout", loader: auth, Component: FeedbackDetail },
    ],
  },
]);

export default router;
