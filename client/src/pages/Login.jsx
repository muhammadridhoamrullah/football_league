import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { doLogin } from "../store/loginSlice";
import Swal from "sweetalert2";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const { loading, data, error, isLogin } = useSelector((state) => state.login);

  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const isEmail = formLogin.username.includes("@");
    console.log(isEmail, "ini isEmail");

    const checkInput = {
      [isEmail ? "email" : "username"]: formLogin.username,
      password: formLogin.password,
    };
    console.log(checkInput, "ini checkinput");

    dispatch(doLogin(checkInput));
  }

  function seePassword() {
    setHidePassword(!hidePassword);
  }

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <div className="w-full min-h-screen bg-[#38003D] flex justify-center items-center">
      <div className="flex w-[800px] h-[475px] bg-white rounded-lg ">
        <div className="flex-1 ">
          <img
            src={"/wallpaperEpl.jpg"}
            alt=""
            className="w-full h-full object-cover rounded-l-md"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-7">
          <div className="w-full h-28 ">
            <img
              src={"/eplLogin.png"}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="font-extrabold text-2xl flex justify-center text-[#38003D] my-4">
            Welcome To EPL
          </div>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-4 text-[#38003D] font-semibold text-md px-4">
              <div className="flex flex-col gap-2">
                <label>Email / Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={changeHandler}
                  value={formLogin.username}
                  className="w-full h-10 p-2 rounded-md border-2 border-[#38003D]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Password</label>
                <div className="relative">
                  <input
                    type={hidePassword ? "password" : "text"}
                    name="password"
                    id="password"
                    onChange={changeHandler}
                    value={formLogin.password}
                    className="w-full h-10 p-2 rounded-md border-2 border-[#38003D]"
                  />

                  <button
                    className="absolute right-2 top-2 "
                    onClick={seePassword}
                  >
                    {hidePassword ? (
                      <Eye className="w-6 h-w-6" />
                    ) : (
                      <EyeOff className="w-6 h-w-6" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-10 bg-[#38003D] text-white rounded-md cursor-pointer hover:bg-[#130b14] "
              >
                LOGIN
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center text-[#38003D] mt-4 font-medium gap-1">
            Don't have an account?
            <Link
              className="font-bold text-orange-600 hover:text-[#38003D]"
              to={"/register"}
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
