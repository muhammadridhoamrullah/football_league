import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Loader2Icon } from "lucide-react";
import { getTeam } from "../store/teamSlice";
import { useNavigate } from "react-router-dom";
import { doCreateMatch, resetCreateMatch } from "../store/createMatchSlice";

export default function CreateMatch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading: loadingCreateMatch,
    error: errorCreateMatch,
    data: dataCreateMatch,
    isCreate,
  } = useSelector((state) => state.createMatch);

  const {
    loading: loadingGetTeam,
    error: errorGetTeam,
    data: dataGetTeam,
  } = useSelector((state) => state.team);

  const [formCreateMatch, setFormCreateMatch] = useState({
    HomeTeamId: "",
    AwayTeamId: "",
    date: "",
    venue: "",
    season: "",
  });

  console.log(formCreateMatch, "ini form create match");

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormCreateMatch({
      ...formCreateMatch,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(doCreateMatch(formCreateMatch));
  }

  useEffect(() => {
    dispatch(getTeam());
  }, []);

  useEffect(() => {
    if (errorGetTeam) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorGetTeam,
      });
    }
  }, [errorGetTeam]);

  useEffect(() => {
    if (errorCreateMatch) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorCreateMatch,
      });
      dispatch(resetCreateMatch());
    }
  }, [errorCreateMatch]);

  useEffect(() => {
    if (isCreate) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Match created successfully",
      });
      navigate("/schedule");
      dispatch(resetCreateMatch());
    }
  }, [isCreate]);

  return (
    <div className="w-full h-[551px] bg-[#38003D] flex flex-col justify-start items-center  gap-4">
      {loadingCreateMatch && (
        <Loader2Icon className="flex justify-center items-center w-52 h-52 animate-spin text-white" />
      )}

      {loadingGetTeam && (
        <Loader2Icon className="flex justify-center items-center w-52 h-52 animate-spin text-white" />
      )}

      {dataGetTeam && dataGetTeam.length > 0 ? (
        <div className="flex flex-col justify-between items-center gap-2">
          <div className="text-white font-extrabold text-3xl">CREATE MATCH</div>

          <form onSubmit={submitHandler}>
            <div className="w-96 h-fit p-4 border-2 border-white rounded-lg flex flex-col justify-between items-start px-4 text-white font-bold text-md gap-2">
              <div className="flex flex-col gap-2 w-full">
                <label>Home Team</label>
                <select
                  className="border border-white w-full h-10 p-2 rounded-lg "
                  name="HomeTeamId"
                  id="HomeTeamId"
                  onChange={changeHandler}
                  value={formCreateMatch.HomeTeamId}
                >
                  <option value="" disabled>
                    Select Home Team
                  </option>
                  {dataGetTeam.map((el) => {
                    return (
                      <option
                        key={el.id}
                        className="w-full bg-[#38003D] font-bold text-white"
                        value={el.id}
                      >
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Away Team</label>
                <select
                  name="AwayTeamId"
                  id="AwayTeamId"
                  className="border border-white w-full h-10 p-2 rounded-lg"
                  onChange={changeHandler}
                  value={formCreateMatch.AwayTeamId}
                >
                  <option value="" disabled>
                    Select Away Team
                  </option>
                  {dataGetTeam.map((el) => {
                    return (
                      <option
                        key={el.id}
                        className="w-full bg-[#38003D] font-bold text-white"
                        value={el.id}
                      >
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={changeHandler}
                  value={formCreateMatch.date}
                  className="w-full border border-white p-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Venue</label>
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  onChange={changeHandler}
                  value={formCreateMatch.venue}
                  className="w-full p-2 rounded-lg border border-white"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Season</label>
                <input
                  type="text"
                  name="season"
                  id="season"
                  onChange={changeHandler}
                  value={formCreateMatch.season}
                  className="w-full border border-white p-2 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-800 w-full h-10  rounded-lg hover:bg-green-900 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center font-bold text-2xl text-white">
          No Data Available
        </div>
      )}
    </div>
  );
}
