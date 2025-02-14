import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStanding } from "../store/standingSlice";
import Swal from "sweetalert2";
import { Loader2Icon } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state) => state.standing);

  useEffect(() => {
    dispatch(fetchStanding());
  }, []);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  }, [error]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center p-10 bg-[#38003D] gap-5">
      <div className="text-white font-extrabold text-5xl">
        Premiere League Standing 2025
      </div>

      {loading ? (
        <Loader2Icon className="w-52 h-52 animate-spin text-white" />
      ) : data && data.length > 0 ? (
        <table className="w-full bg-white rounded-lg overflow-hidden font-bold">
          <thead className="bg-gray-200 text-gray-700 ">
            <tr>
              <th className="py-3 px-4 text-center">Pos</th>
              <th className="py-3 px-4 text-center">Team</th>
              <th className="py-3 px-4 text-center">MP</th>
              <th className="py-3 px-4 text-center">W</th>
              <th className="py-3 px-4 text-center">D</th>
              <th className="py-3 px-4 text-center">L</th>
              <th className="py-3 px-4 text-center">GF</th>
              <th className="py-3 px-4 text-center">GA</th>
              <th className="py-3 px-4 text-center">GD</th>
              <th className="py-3 px-4 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, i) => {
              return (
                <tr
                  key={el?.id}
                  className={i % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                >
                  <td className="py-3 px-4 text-center">{i + 1}</td>
                  <td className="py-3 px-4">{el?.Team?.name}</td>
                  <td className="py-3 px-4 text-center">{el?.matchesPlayed}</td>
                  <td className="py-3 px-4 text-center">{el?.wins}</td>
                  <td className="py-3 px-4 text-center">{el?.draws}</td>
                  <td className="py-3 px-4 text-center">{el?.losses}</td>
                  <td className="py-3 px-4 text-center">{el?.goalsFor}</td>
                  <td className="py-3 px-4 text-center">{el?.goalsAgainst}</td>
                  <td className="py-3 px-4 text-center">
                    {el?.goalsFor - el?.goalsAgainst}
                  </td>
                  <td className="py-3 px-4 text-center">{el?.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-white font-bold text-2xl">No Data Available</div>
      )}
    </div>
  );
}

// [
//   {
//       "id": 15,
//       "TeamId": 15,
//       "season": "2025",
//       "matchesPlayed": 2,
//       "wins": 2,
//       "draws": 0,
//       "losses": 0,
//       "goalsFor": 11,
//       "goalsAgainst": 0,
//       "points": 6,
//       "createdAt": "2025-02-13T03:30:56.661Z",
//       "updatedAt": "2025-02-13T14:31:21.494Z",
//       "Team": {
//           "id": 15,
//           "name": "Everton",
//           "city": "Liverpool",
//           "stadium": "Goodison Park",
//           "foundedYear": 1878,
//           "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcbYrBuHs9ERzqwjovhSpYKYh4C6gDC-RkTkNLAf7gmfB_JiR5dF-VxR00YHCAmfS7cqHnpsx_uyFZ9anO2JU6EIP4dclYGc0ctn-3yfZRTZ9xtvrZI8A-yYnqv9gy8MeDhiasQoKhyphenhyphenCMsnLFc8I1C9b8lmgedpHgkGUyBgD9XlrKl7ZCowsYuoaTZGwk/s600/Burnley_FC.png",
//           "createdAt": "2025-02-13T03:07:29.844Z",
//           "updatedAt": "2025-02-13T03:07:29.844Z"
//       }
//   },

// ]
