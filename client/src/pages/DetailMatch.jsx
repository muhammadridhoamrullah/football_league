import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailMatch } from "../store/detailMatchSlice";
import {
  Calendar1,
  Clock,
  Loader2Icon,
  MapPin,
  NotebookTabsIcon,
} from "lucide-react";
import { formatDate, formatTime } from "../components/CardSchedule";

export default function DetailMatch() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.detailMatch);
  console.log(data, "ini data detail match");

  useEffect(() => {
    dispatch(getDetailMatch(id));
  }, []);

  const homeGoals =
    data?.goals?.filter(
      (el) => el.ScorerTeamId === data.findMatchById.HomeTeamId
    ).length || 0;

  const awayGoals =
    data?.goals?.filter(
      (el) => el.ScorerTeamId === data.findMatchById.AwayTeamId
    ).length || 0;

  return (
    <div className="w-full h-[551px] flex justify-center items-start pt-4 bg-[#38003D] text-white">
      {loading && (
        <Loader2Icon className="flex justify-center items-center w-40 h-40 animate-spin text-white" />
      )}
      {data && data.findMatchById ? (
        <div className="w-[1100px] h-[500px] border-2 border-white rounded-lg flex flex-col justify-between p-4">
          <div className="flex-1  flex justify-between">
            <div className=" w-2/3 h-full relative">
              <img
                src={data.findMatchById.HomeTeam.logoUrl}
                alt={data.findMatchById.HomeTeam.name}
                className="absolute w-full h-full  inset-0 object-contain"
              />
            </div>
            <div className=" w-1/3 h-full flex flex-col justify-center items-center text-4xl font-bold gap-2">
              <div>VS</div>
              <div className="text-5xl font-bold">
                {homeGoals} - {awayGoals}
              </div>
            </div>
            <div className=" w-2/3 h-full relative">
              <img
                src={data.findMatchById.AwayTeam.logoUrl}
                alt={data.findMatchById.AwayTeam.name}
                className="absolute w-full h-full inset-0 object-contain"
              />
            </div>
          </div>
          <div className="flex-2  flex flex-col justify-between items-center font-bold text-lg">
            <div className="flex flex-col justify-between items-center gap-2">
              <div>Match Details</div>
              <div className="flex w-60 gap-4 ">
                <Calendar1 className="" />
                <div className="">{formatDate(data.findMatchById.date)}</div>
              </div>
              <div className="flex w-60 gap-4 ">
                <Clock className="" />
                <div>{formatTime(data.findMatchById.date)}</div>
              </div>
              <div className="flex w-60 gap-4 ">
                <MapPin className="" />
                <div>{data.findMatchById.venue}</div>
              </div>

              <div className="flex w-60 gap-4 ">
                <NotebookTabsIcon className="" />
                <div>{data.findMatchById.status}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full">
              <div>Goals</div>
              {data.goals.map((el) => {
                return (
                  <div className="flex justify-center items-center w-[600px] gap-4 ">
                    <div className="w-1/5 ">{el.scorer}</div>
                    <div className="w-1/5 ">({el.minute})</div>
                    <div className="w-1/5 ">{el.assistBy}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full ">
              <div>Ticket</div>
              {data.tickets.map((el) => {
                return (
                  <div
                    key={el.id}
                    className="flex justify-center items-center w-[600px]  gap-4"
                  >
                    <div className="w-1/5 ">{el.category}</div>
                    <div className="w-1/5 ">{el.price}</div>
                    <div className="w-1/5 ">{el.status}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-2xl font-bold">
          No Data Available
        </div>
      )}
    </div>
  );
}

// {
//   "findMatchById": {
//     "id": 8,
//     "HomeTeamId": 15,
//     "AwayTeamId": 16,
//     "date": "2025-02-23T00:00:00.000Z",
//     "venue": "Wanda Metropoliano",
//     "status": "Finished",
//     "homeTeamScore": 1,
//     "awayTeamScore": 0,
//     "season": "2024",
//     "createdAt": "2025-02-13T03:36:42.333Z",
//     "updatedAt": "2025-02-13T14:31:21.478Z",
//     "HomeTeam": {
//       "id": 15,
//       "name": "Everton",
//       "city": "Liverpool",
//       "stadium": "Goodison Park",
//       "foundedYear": 1878,
//       "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcbYrBuHs9ERzqwjovhSpYKYh4C6gDC-RkTkNLAf7gmfB_JiR5dF-VxR00YHCAmfS7cqHnpsx_uyFZ9anO2JU6EIP4dclYGc0ctn-3yfZRTZ9xtvrZI8A-yYnqv9gy8MeDhiasQoKhyphenhyphenCMsnLFc8I1C9b8lmgedpHgkGUyBgD9XlrKl7ZCowsYuoaTZGwk/s600/Burnley_FC.png",
//       "createdAt": "2025-02-13T03:07:29.844Z",
//       "updatedAt": "2025-02-13T03:07:29.844Z"
//     },
//     "AwayTeam": {
//       "id": 16,
//       "name": "Luton Town",
//       "city": "Luton",
//       "stadium": "Kenilworth Road",
//       "foundedYear": 1885,
//       "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivkLU_9ow87msLxrlxSNkXF3OkBfL2g1hOV_UUvAzgd1DQvYD40BUU0tks6E-QGD9Q9XfbbV5l-X_fiOeXvAknuWQuVsGlf8z2hyphenhyphen4w4_aBeGNmKmAm0nEq0lHPbgUxOMbYM25nmp9DaAwn1fuZQAJ2heNki2MSccjSftEF_T-uRJArcQeB7m-oBKbxEsE/s600/Luton_Town.png",
//       "createdAt": "2025-02-13T03:07:29.844Z",
//       "updatedAt": "2025-02-13T03:07:29.844Z"
//     }
//   },
//   "goals": [
//     {
//       "id": 7,
//       "MatchId": 8,
//       "ScorerTeamId": 15,
//       "scorer": "Justin Bieber",
//       "minute": 87,
//       "assistBy": "Kevin Kaks",
//       "createdAt": "2025-02-13T07:39:47.932Z",
//       "updatedAt": "2025-02-13T07:39:47.932Z",
//       "Team": {
//         "id": 15,
//         "name": "Everton",
//         "city": "Liverpool",
//         "stadium": "Goodison Park",
//         "foundedYear": 1878,
//         "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcbYrBuHs9ERzqwjovhSpYKYh4C6gDC-RkTkNLAf7gmfB_JiR5dF-VxR00YHCAmfS7cqHnpsx_uyFZ9anO2JU6EIP4dclYGc0ctn-3yfZRTZ9xtvrZI8A-yYnqv9gy8MeDhiasQoKhyphenhyphenCMsnLFc8I1C9b8lmgedpHgkGUyBgD9XlrKl7ZCowsYuoaTZGwk/s600/Burnley_FC.png",
//         "createdAt": "2025-02-13T03:07:29.844Z",
//         "updatedAt": "2025-02-13T03:07:29.844Z"
//       }
//     },
//     {
//       "id": 8,
//       "MatchId": 8,
//       "ScorerTeamId": 15,
//       "scorer": "DeanKT",
//       "minute": 89,
//       "assistBy": "Adel",
//       "createdAt": "2025-02-13T14:31:21.448Z",
//       "updatedAt": "2025-02-13T14:31:21.448Z",
//       "Team": {
//         "id": 15,
//         "name": "Everton",
//         "city": "Liverpool",
//         "stadium": "Goodison Park",
//         "foundedYear": 1878,
//         "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcbYrBuHs9ERzqwjovhSpYKYh4C6gDC-RkTkNLAf7gmfB_JiR5dF-VxR00YHCAmfS7cqHnpsx_uyFZ9anO2JU6EIP4dclYGc0ctn-3yfZRTZ9xtvrZI8A-yYnqv9gy8MeDhiasQoKhyphenhyphenCMsnLFc8I1C9b8lmgedpHgkGUyBgD9XlrKl7ZCowsYuoaTZGwk/s600/Burnley_FC.png",
//         "createdAt": "2025-02-13T03:07:29.844Z",
//         "updatedAt": "2025-02-13T03:07:29.844Z"
//       }
//     }
//   ],
//   "tickets": [
//     {
//       "id": 4,
//       "MatchId": 8,
//       "category": "Economy",
//       "price": 100000,
//       "quantity": 100,
//       "remainingQuantity": 100,
//       "status": "Available",
//       "createdAt": "2025-02-13T03:37:00.286Z",
//       "updatedAt": "2025-02-13T03:37:00.286Z"
//     },
//     {
//       "id": 3,
//       "MatchId": 8,
//       "category": "VIP",
//       "price": 200000,
//       "quantity": 50,
//       "remainingQuantity": 0,
//       "status": "Sold Out",
//       "createdAt": "2025-02-13T03:36:51.833Z",
//       "updatedAt": "2025-02-13T03:58:31.433Z"
//     }
//   ]
// }
