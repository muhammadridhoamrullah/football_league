import { LogOutIcon } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Navbar() {
  const linkNow = useLocation();
  const pathNameWithoutSlash =
    linkNow.pathname === "/" ? "" : linkNow.pathname.slice(1);
  console.log(pathNameWithoutSlash, "ini pathNameWithoutSlash");

  const navigate = useNavigate();

  function pathActive(path) {
    if (pathNameWithoutSlash === path) {
      return "bg-[#DA291C] ";
    }

    return "hover:text-[#ceab5d]";
  }

  function logoutHandler() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="w-full h-14 bg-[#38003D] text-white flex justify-between  font-semibold text-md sticky top-0 z-50">
      <div className="flex w-80 h-full ">
        <Link
          to={"/"}
          className={`flex justify-center items-center w-full ${pathActive(
            ""
          )}`}
        >
          Dashboard
        </Link>
        <Link
          to={"/teams"}
          className={`flex justify-center items-center w-full ${pathActive(
            "teams"
          )}`}
        >
          Team
        </Link>
        <Link
          to={"/schedule"}
          className={`flex justify-center items-center w-full ${pathActive(
            "schedule"
          )}`}
        >
          Schedule
        </Link>
      </div>
      <div className="flex w-56 h-full">
        <Link
          className={`flex justify-center items-center w-full hover:text-[#ceab5d] cursor-pointer ${pathActive(
            "my-ticket"
          )}`}
          to={"/my-ticket"}
        >
          My Tickets
        </Link>
        <button
          onClick={() => {
            logoutHandler();
          }}
          className="text-sm flex justify-center items-center mr-5 w-fit p-2 gap-1 hover:text-[#ceab5d] cursor-pointer"
        >
          <LogOutIcon /> Logout
        </button>
      </div>
    </div>
  );
}
