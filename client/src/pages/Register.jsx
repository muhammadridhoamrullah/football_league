import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doRegister } from "../store/registerSlice";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error, isRegistered } = useSelector(
    (state) => state.register
  );

  const [formRegister, setFormRegister] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(doRegister(formRegister));
  }

  // if (loading) {
  //   return (
  //     <div className="w-full min-h-screen bg-[#004170] flex justify-center items-center py-10">
  //       <Loader2 className="text-white w-12 h-12 animate-spin" />
  //     </div>
  //   );
  // }

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
    if (isRegistered) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Register success",
      });
      navigate("/login");
    }
  }, [isRegistered]);

  return (
    <form onSubmit={submitHandler}>
      {loading && (
        <div className="w-full min-h-screen bg-[#004170] flex justify-center items-center py-10">
          <Loader2 className="text-white w-12 h-12 animate-spin" />
        </div>
      )}

      <div className="w-full min-h-screen bg-[#004170] flex justify-center items-center py-10">
        <div className="w-96 h-fit gap-10 px-4 py-6 border border-white text-white flex flex-col justify-between rounded-lg">
          <div className="flex justify-center font-extrabold text-4xl">
            REGISTER
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-lg">USERNAME</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={changeHandler}
                value={formRegister.username}
                className="w-full h-8 p-2 font-medium border border-white rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-lg">EMAIL</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={changeHandler}
                value={formRegister.email}
                className="w-full h-8 p-2 font-medium border border-white rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-lg">PASSWORD</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={changeHandler}
                value={formRegister.password}
                className="w-full h-8 p-2 font-medium border border-white rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-lg">FULL NAME</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                onChange={changeHandler}
                value={formRegister.fullName}
                className="w-full h-8 p-2 font-medium border border-white rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-lg">PHONE NUMBER</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={changeHandler}
                value={formRegister.phoneNumber}
                className="w-full h-8 p-2 font-medium border border-white rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full h-10 font-bold bg-green-700 rounded-lg hover:bg-green-800 mt-5 cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
