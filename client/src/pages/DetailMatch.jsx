import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailMatch } from "../store/detailMatchSlice";

export default function DetailMatch() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.detailMatch);
  console.log(data, "ini data detail match");

  useEffect(() => {
    dispatch(getDetailMatch(id));
  }, []);

  return (
    <div className="w-full h-[551px] flex justify-center items-center bg-[#38003D] text-white">
      <div className="max-w-[1100px] max-h-[400px] border-2 border-white rounded-lg flex flex-col justify-between p-4">
        <div className="bg-red-500 flex-2 flex justify-between">
          <div className="bg-amber-950  overflow-hidden">
            <img
              src={data.findMatchById?.HomeTeam?.logoUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-amber-700 flex-1">VS</div>
          <div className="bg-lime-500 flex-4">Away</div>
        </div>
        <div className="bg-blue-300 flex-[0.75]">Nama KLUB</div>
        <div className="bg-yellow-300 flex-[0.75]">Skor</div>
        <div className="bg-green-600 flex-3">Detail</div>
      </div>
    </div>
  );
}

// {
//     "findMatchById": {
//       "id": 8,
//       "HomeTeamId": 15,
//       "AwayTeamId": 16,
//       "date": "2025-02-23T00:00:00.000Z",
//       "venue": "Wanda Metropoliano",
//       "status": "Finished",
//       "homeTeamScore": 1,
//       "awayTeamScore": 0,
//       "season": "2024",
//       "createdAt": "2025-02-13T03:36:42.333Z",
//       "updatedAt": "2025-02-13T07:39:47.940Z",
//       "HomeTeam": {
//         "id": 15,
//         "name": "Everton",
//         "city": "Liverpool",
//         "stadium": "Goodison Park",
//         "foundedYear": 1878,
//         "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcbYrBuHs9ERzqwjovhSpYKYh4C6gDC-RkTkNLAf7gmfB_JiR5dF-VxR00YHCAmfS7cqHnpsx_uyFZ9anO2JU6EIP4dclYGc0ctn-3yfZRTZ9xtvrZI8A-yYnqv9gy8MeDhiasQoKhyphenhyphenCMsnLFc8I1C9b8lmgedpHgkGUyBgD9XlrKl7ZCowsYuoaTZGwk/s600/Burnley_FC.png",
//         "createdAt": "2025-02-13T03:07:29.844Z",
//         "updatedAt": "2025-02-13T03:07:29.844Z"
//       },
//       "AwayTeam": {
//         "id": 16,
//         "name": "Luton Town",
//         "city": "Luton",
//         "stadium": "Kenilworth Road",
//         "foundedYear": 1885,
//         "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivkLU_9ow87msLxrlxSNkXF3OkBfL2g1hOV_UUvAzgd1DQvYD40BUU0tks6E-QGD9Q9XfbbV5l-X_fiOeXvAknuWQuVsGlf8z2hyphenhyphen4w4_aBeGNmKmAm0nEq0lHPbgUxOMbYM25nmp9DaAwn1fuZQAJ2heNki2MSccjSftEF_T-uRJArcQeB7m-oBKbxEsE/s600/Luton_Town.png",
//         "createdAt": "2025-02-13T03:07:29.844Z",
//         "updatedAt": "2025-02-13T03:07:29.844Z"
//       }
//     },
//     "goals": [
//       {
//         "id": 7,
//         "MatchId": 8,
//         "ScorerTeamId": 15,
//         "scorer": "Justin Bieber",
//         "minute": 87,
//         "assistBy": "Kevin Kaks",
//         "createdAt": "2025-02-13T07:39:47.932Z",
//         "updatedAt": "2025-02-13T07:39:47.932Z"
//       }
//     ],
//     "tickets": [
//       {
//         "id": 4,
//         "MatchId": 8,
//         "category": "Economy",
//         "price": 100000,
//         "quantity": 100,
//         "remainingQuantity": 100,
//         "status": "Available",
//         "createdAt": "2025-02-13T03:37:00.286Z",
//         "updatedAt": "2025-02-13T03:37:00.286Z"
//       },
//       {
//         "id": 3,
//         "MatchId": 8,
//         "category": "VIP",
//         "price": 200000,
//         "quantity": 50,
//         "remainingQuantity": 0,
//         "status": "Sold Out",
//         "createdAt": "2025-02-13T03:36:51.833Z",
//         "updatedAt": "2025-02-13T03:58:31.433Z"
//       }
//     ]
//   }

"use client"

const dummyData = {
  findMatchById: {
    id: 8,
    HomeTeamId: 15,
    AwayTeamId: 16,
    date: "2025-02-23T00:00:00.000Z",
    venue: "Wanda Metropoliano",
    status: "Finished",
    homeTeamScore: 1,
    awayTeamScore: 0,
    season: "2024",
    createdAt: "2025-02-13T03:36:42.333Z",
    updatedAt: "2025-02-13T07:39:47.940Z",
    HomeTeam: {
      id: 15,
      name: "Everton",
      city: "Liverpool",
      stadium: "Goodison Park",
      foundedYear: 1878,
      logoUrl:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcbYrBuHs9ERzqwjovhSpYKYh4C6gDC-RkTkNLAf7gmfB_JiR5dF-VxR00YHCAmfS7cqHnpsx_uyFZ9anO2JU6EIP4dclYGc0ctn-3yfZRTZ9xtvrZI8A-yYnqv9gy8MeDhiasQoKhyphenhyphenCMsnLFc8I1C9b8lmgedpHgkGUyBgD9XlrKl7ZCowsYuoaTZGwk/s600/Burnley_FC.png",
      createdAt: "2025-02-13T03:07:29.844Z",
      updatedAt: "2025-02-13T03:07:29.844Z",
    },
    AwayTeam: {
      id: 16,
      name: "Luton Town",
      city: "Luton",
      stadium: "Kenilworth Road",
      foundedYear: 1885,
      logoUrl:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivkLU_9ow87msLxrlxSNkXF3OkBfL2g1hOV_UUvAzgd1DQvYD40BUU0tks6E-QGD9Q9XfbbV5l-X_fiOeXvAknuWQuVsGlf8z2hyphenhyphen4w4_aBeGNmKmAm0nEq0lHPbgUxOMbYM25nmp9DaAwn1fuZQAJ2heNki2MSccjSftEF_T-uRJArcQeB7m-oBKbxEsE/s600/Luton_Town.png",
      createdAt: "2025-02-13T03:07:29.844Z",
      updatedAt: "2025-02-13T03:07:29.844Z",
    },
  },
  goals: [
    {
      id: 7,
      MatchId: 8,
      ScorerTeamId: 15,
      scorer: "Justin Bieber",
      minute: 87,
      assistBy: "Kevin Kaks",
      createdAt: "2025-02-13T07:39:47.932Z",
      updatedAt: "2025-02-13T07:39:47.932Z",
    },
  ],
  tickets: [
    {
      id: 4,
      MatchId: 8,
      category: "Economy",
      price: 100000,
      quantity: 100,
      remainingQuantity: 100,
      status: "Available",
      createdAt: "2025-02-13T03:37:00.286Z",
      updatedAt: "2025-02-13T03:37:00.286Z",
    },
    {
      id: 3,
      MatchId: 8,
      category: "VIP",
      price: 200000,
      quantity: 50,
      remainingQuantity: 0,
      status: "Sold Out",
      createdAt: "2025-02-13T03:36:51.833Z",
      updatedAt: "2025-02-13T03:58:31.433Z",
    },
  ],
}

// export default function DetailMatch() {
//   const { findMatchById, goals, tickets } = dummyData

//   return (
//     <div className="w-full min-h-screen flex justify-center items-center bg-[#38003D] text-white p-4">
//       <div className="w-full max-w-[1100px] border-2 border-white rounded-lg flex flex-col justify-between p-6 space-y-6">
//         <div className="flex justify-between items-center">
//           <div className="flex flex-col items-center w-1/3">
//             <div className="w-32 h-32 relative overflow-hidden mb-4">
//               <img
//                 src={findMatchById.HomeTeam.logoUrl || "/placeholder.svg"}
//                 alt={findMatchById.HomeTeam.name}
//                 className="absolute inset-0 w-full h-full object-contain"
//               />
//             </div>
//             <span className="text-xl font-bold">{findMatchById.HomeTeam.name}</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <div className="text-4xl font-bold mb-2">VS</div>
//             <div className="text-5xl font-bold">
//               {findMatchById.homeTeamScore} - {findMatchById.awayTeamScore}
//             </div>
//           </div>
//           <div className="flex flex-col items-center w-1/3">
//             <div className="w-32 h-32 relative overflow-hidden mb-4">
//               <img
//                 src={findMatchById.AwayTeam.logoUrl || "/placeholder.svg"}
//                 alt={findMatchById.AwayTeam.name}
//                 className="absolute inset-0 w-full h-full object-contain"
//               />
//             </div>
//             <span className="text-xl font-bold">{findMatchById.AwayTeam.name}</span>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-2xl font-semibold">Match Details</h3>
//           <p>Date: {new Date(findMatchById.date).toLocaleDateString()}</p>
//           <p>Venue: {findMatchById.venue}</p>
//           <p>Status: {findMatchById.status}</p>
//           <p>Season: {findMatchById.season}</p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-2xl font-semibold">Goals</h3>
//           {goals.map((goal) => (
//             <p key={goal.id}>
//               {goal.scorer} ({goal.minute}') - Assisted by: {goal.assistBy}
//             </p>
//           ))}
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-2xl font-semibold">Tickets</h3>
//           {tickets.map((ticket) => (
//             <div key={ticket.id} className="flex justify-between items-center">
//               <span>{ticket.category}</span>
//               <span>Price: ${ticket.price}</span>
//               <span>Status: {ticket.status}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

