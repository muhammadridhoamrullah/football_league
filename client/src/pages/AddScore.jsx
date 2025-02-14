import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailMatch } from "../store/detailMatchSlice";
import Swal from "sweetalert2";
import { Loader2Icon } from "lucide-react";
import { goAddScore, resetAddScore } from "../store/addScoreSlice";

export default function AddScore() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    loading: loadingDetailMatch,
    error: errorDetailMatch,
    data: dataDetailMatch,
  } = useSelector((state) => state.detailMatch);

  const {
    loading: loadingAddScore,
    error: errorAddScore,
    data: dataAddScore,
    isSuccess,
  } = useSelector((state) => state.addScore);

  const [formAddScore, setFormAddScore] = useState({
    homeTeamScore: "",
    awayTeamScore: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormAddScore({
      ...formAddScore,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    dispatch(goAddScore(formAddScore, id));
  }

  useEffect(() => {
    if (errorAddScore) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorAddScore,
      });
      dispatch(resetAddScore());
    }
  }, [errorAddScore]);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Score updated successfully",
      });
      dispatch(resetAddScore());
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
    <div className="w-full min-h-screen bg-[#38003D] flex justify-center items-start py-10">
      {loadingDetailMatch || loadingAddScore ? (
        <Loader2Icon className="w-40 h-40 text-white flex justify-center items-center animate-spin" />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="w-[500px] h-fit gap-4 border border-white rounded-lg p-4 flex flex-col justify-between items-center font-medium text-white">
            <div className="text-lg">
              Update Score Match Id {dataDetailMatch?.findMatchById?.id}{" "}
            </div>
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              <label>{dataDetailMatch?.findMatchById?.HomeTeam?.name}</label>
              <input
                type="number"
                name="homeTeamScore"
                id="homeTeamScore"
                onChange={changeHandler}
                value={formAddScore.homeTeamScore}
                className="w-52 border border-white h-10 p-2 rounded-md text-center"
              />
            </div>
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              <label>{dataDetailMatch?.findMatchById?.AwayTeam?.name}</label>
              <input
                type="number"
                name="awayTeamScore"
                id="awayTeamScore"
                onChange={changeHandler}
                value={formAddScore.awayTeamScore}
                className="w-52 border border-white h-10 p-2 rounded-md text-center"
              />
            </div>
            <button
              type="submit"
              className="w-52 h-12 rounded-lg bg-green-800 hover:bg-green-700 cursor-pointer mt-3"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
