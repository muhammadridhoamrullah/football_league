import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailMatch } from "../store/detailMatchSlice";
import Swal from "sweetalert2";
import { goAddGoal, resetAddGoal } from "../store/addGoalSlice";
import { Loader2Icon } from "lucide-react";

export default function AddGoal() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: dataDetailMatch,
    loading: loadingDetailMatch,
    error: errorDetailMatch,
  } = useSelector((state) => state.detailMatch);

  const {
    data: dataAddGoal,
    loading: loadingAddGoal,
    error: errorAddGoal,
    isSuccess,
  } = useSelector((state) => state.addGoal);

  console.log(isSuccess, "ini isSuccess di add goal");

  const [formAddGoal, setFormAddGoal] = useState({
    ScorerTeamId: "",
    scorer: "",
    minute: "",
    assistBy: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormAddGoal({
      ...formAddGoal,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(goAddGoal(formAddGoal, id));
  }

  useEffect(() => {
    if (errorAddGoal) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorAddGoal,
      });
      dispatch(resetAddGoal());
    }
  }, [errorAddGoal]);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Goal added successfully",
      });
      dispatch(resetAddGoal());
      navigate(`/schedule/detailMatch/${id}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(getDetailMatch(id));
  }, [id]);

  useEffect(() => {
    if (errorDetailMatch) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorDetailMatch,
      });
    }
  }, [errorDetailMatch]);

  return (
    <div className="w-full h-[551px] bg-[#38003D] text-white flex justify-center items-start py-10">
      {loadingDetailMatch || loadingAddGoal ? (
        <Loader2Icon className="w-52 h-52 flex justify-center items-center text-white animate-spin " />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="w-fit h-fit border border-white p-4 flex flex-col justify-between items-center gap-4 font-bold">
            <div className="w-full  flex justify-center items-center  text-2xl">
              {dataDetailMatch?.findMatchById?.HomeTeam?.name} x{" "}
              {dataDetailMatch?.findMatchById?.AwayTeam?.name}
            </div>
            <div className="w-full flex flex-col gap-2 items-center ">
              <label>Team Scorer</label>
              <select
                name="ScorerTeamId"
                id="ScorerTeamId"
                onChange={changeHandler}
                value={formAddGoal.ScorerTeamId}
                className="w-full  bg-transparent border border-white h-10 p-2 rounded-md text-center  "
              >
                <option
                  className="flex justify-center items-center"
                  value=""
                  disabled
                >
                  Select Team Scorer
                </option>
                <option
                  className="bg-[#38003D] font-bold text-white"
                  value={dataDetailMatch?.findMatchById?.HomeTeamId}
                >
                  {dataDetailMatch?.findMatchById?.HomeTeam?.name}
                </option>
                <option
                  className="bg-[#38003D] font-bold text-white"
                  value={dataDetailMatch?.findMatchById?.AwayTeamId}
                >
                  {dataDetailMatch?.findMatchById?.AwayTeam?.name}
                </option>
              </select>
            </div>

            <div className="w-full flex flex-col gap-2 items-center">
              <label>Scorer</label>
              <input
                type="text"
                name="scorer"
                id="scorer"
                onChange={changeHandler}
                value={formAddGoal.scorer}
                className="w-full border border-white p-2 text-center rounded-lg"
              />
            </div>

            <div className="w-full flex flex-col gap-2 items-center">
              <label>Minute</label>
              <input
                type="number"
                name="minute"
                id="minute"
                onChange={changeHandler}
                value={formAddGoal.minute}
                className="w-full border border-white p-2 text-center rounded-lg"
              />
            </div>

            <div className="w-full flex flex-col gap-2 items-center">
              <label>Assisted By</label>
              <input
                type="text"
                name="assistBy"
                id="assistBy"
                onChange={changeHandler}
                value={formAddGoal.assistBy}
                className="w-full border border-white p-2 text-center rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full h-10 p-2 bg-green-800 hover:bg-green-700 rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
