import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import TeamDetail from "./pages/TeamDetail";
import Schedule from "./pages/Schedule";
import CreateMatch from "./pages/CreateMatch";
import DetailMatch from "./pages/DetailMatch";
import BuyTicket from "./pages/BuyTicket";
import MyTicket from "./pages/MyTicket";
import CreateTicket from "./pages/CreateTicket";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: checkLogin,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "teams",
        element: <Team />,
      },
      {
        path: "team/:id",
        element: <TeamDetail />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "schedule/create-match",
        element: <CreateMatch />,
      },
      {
        path: "schedule/detailMatch/:id",
        element: <DetailMatch />,
      },
      {
        path: "schedule/match/buy-ticket/:id",
        element: <BuyTicket />,
      },
      {
        path: "my-ticket",
        element: <MyTicket />,
      },
      {
        path: "create-ticket/:id",
        element: <CreateTicket />,
      },
    ],
  },
]);

export default router;
