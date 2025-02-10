import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <h1>Login</h1>,
  },
]);

export default router;
