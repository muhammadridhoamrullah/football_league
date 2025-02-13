import { Calendar1, LandPlot, MapPin, NotebookTabsIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("id-ID", options);
};

function statusMatch(status) {
  if (status === "Finished") {
    return "bg-red-500 w-fit h-fit p-2 rounded-lg";
  } else {
    return "bg-green-500 w-fit h-fit p-2 rounded-lg";
  }
}

export default function CardSchedule({ data }) {
  return (
    <div className="w-64 h-80 border-2 border-white rounded-lg flex flex-col">
      <div className="flex-2 flex justify-between items-center p-2 gap-4">
        <div className="flex-1 w-full h-full">
          <img src={data.HomeTeam.logoUrl} alt="" />
        </div>
        <div className=" flex-1 w-full h-full">
          <img src={data.AwayTeam.logoUrl} alt="" />
        </div>
      </div>
      <div className="flex-0.5  flex justify-between font-bold text-2xl ">
        <div className="w-full flex justify-center">{data.homeTeamScore}</div>
        <div className="w-full flex justify-center">{data.awayTeamScore}</div>
      </div>
      <div className="flex-2 flex flex-col justify-between p-2 gap-2 font-semibold">
        <div className=" w-full flex justify-between">
          <Calendar1 className="w-20" />
          <div className="w-full flex justify-start ">
            {formatDate(data.date)}
          </div>
        </div>
        <div className="w-full flex justify-between">
          <MapPin className="w-20" />
          <div className="w-full flex justify-start">{data.venue}</div>
        </div>
        <div className="w-full flex justify-between">
          <NotebookTabsIcon className="w-20" />
          <div className={`w-full flex justify-start`}>{data.status}</div>
        </div>
        <div className="flex gap-2 justify-end">
          <Link
            to={`/schedule/detailMatch/${data.id}`}
            className="cursor-pointer w-12 h-7 rounded-sm bg-blue-700 font-medium text-sm flex justify-center items-center"
          >
            Detail
          </Link>

          {data.status === "Finished" ? (
            <button
              disabled
              className="w-10 h-7 rounded-sm bg-gray-700 font-medium text-sm"
            >
              End
            </button>
          ) : (
            <button className="w-10 h-7 rounded-sm bg-green-800 font-medium text-sm cursor-pointer">
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// {
//     "id": 1,
//     "HomeTeamId": 1,
//     "AwayTeamId": 2,
//     "date": "2025-02-12T00:00:00.000Z",
//     "venue": "Etihad Stadium",
//     "status": "Finished",
//     "homeTeamScore": 2,
//     "awayTeamScore": 1,
//     "season": "2024",
//     "createdAt": "2025-02-12T17:09:09.636Z",
//     "updatedAt": "2025-02-12T17:24:31.031Z",
//     "HomeTeam": {
//         "id": 1,
//         "name": "Manchester City",
//         "city": "Manchester",
//         "stadium": "Etihad Stadium",
//         "foundedYear": 1880,
//         "logoUrl": "https://3.bp.blogspot.com/-CR_2muWX-7s/WI3ZYwIGwLI/AAAAAAAAE7k/OltdjQk6648IYZ0aqqVVfl4kSCyo3I4ngCLcB/s600/Manchester%2BCity.png",
//         "createdAt": "2025-02-12T17:06:33.034Z",
//         "updatedAt": "2025-02-12T17:06:33.034Z"
//     },
//     "AwayTeam": {
//         "id": 2,
//         "name": "Liverpool",
//         "city": "Liverpool",
//         "stadium": "Anfield",
//         "foundedYear": 1892,
//         "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8txYrfWOto98IL6gtQUifN-NoLko1gCd1UhYD3G1JaQWFqNFcxGyEkrVSuOvi3hSOchfNafMFbVhZLZr587ll-jOz8dcduZuoM3w9mK_7ZTnIo8fkRPegFrhVu3Huks-Pp8YdqjSOjDu0YOz4Ki3x2sjB93TpuzKN6hyBBSMtdTgbr4AZ9_EhX9nT/s600/Liverpool_FC.png",
//         "createdAt": "2025-02-12T17:06:33.034Z",
//         "updatedAt": "2025-02-12T17:06:33.034Z"
//     }
// }
