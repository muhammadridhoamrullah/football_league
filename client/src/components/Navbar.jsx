import { LogOutIcon } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Navbar() {
  const linkNow = useLocation();
  const navigate = useNavigate();
  console.log(linkNow.pathname, "ini link");

  function pathActive(path) {
    if (linkNow.pathname === path) {
      return "bg-[#DA291C] ";
    }

    return "hover:text-[#ceab5d]";
  }

  function logoutHandler() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="w-full h-14 bg-[#38003D] text-white flex justify-between  font-semibold text-md">
      <div className="flex w-80 h-full">
        <Link
          to={""}
          className={`flex justify-center items-center w-full ${pathActive(
            "/"
          )}`}
        >
          Dashboard
        </Link>
        <Link
          to={"/team"}
          className={`flex justify-center items-center w-full ${pathActive(
            "/team"
          )}`}
        >
          Team
        </Link>
        <Link
          to={"/schedule"}
          className={`flex justify-center items-center w-full ${pathActive(
            "/schedule"
          )}`}
        >
          Schedule
        </Link>
      </div>
      <button
        onClick={() => {
          logoutHandler();
        }}
        className="text-sm flex justify-center items-center mr-5 w-fit p-2 gap-1 hover:text-[#ceab5d] cursor-pointer"
      >
        <LogOutIcon /> Logout
      </button>
    </div>
  );
}
