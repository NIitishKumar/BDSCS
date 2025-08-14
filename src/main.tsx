import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import BDSLoginPage from "./pages/Login/index.tsx";
import BDSClassesStudentsDashboard from "./pages/AdminClasses/index.tsx";
import TeacherDashboard from "./pages/TeacherBoard/index.tsx";
import ParentDashboard from "./pages/ParentsBoard/index.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <BDSLoginPage />,
  },
  {
    path: "/admin",
    element: <BDSClassesStudentsDashboard />,
  },
  {
    path: "/teacher-board",
    element: <TeacherDashboard />,
  },
  {
    path: "parents-board",
    element: <ParentDashboard />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
