import { Calendar1Icon, MapPin, NotebookTabsIcon, Ticket } from "lucide-react";
import { formatDate } from "./CardSchedule";

export default function CardMyTicket({ data }) {
  function jumlahTiket(tiket) {
    return tiket < 2 ? "Ticket" : "Tickets";
  }
  return (
    <div className="w-64 h-64 border border-white rounded-lg flex gap-3 flex-col justify-between items-center p-4">
      <div className="flex-1 w-full h-full  flex justify-center items-center">
        <div className="w-2/3 h-full relative ">
          <img
            src={data?.Ticket?.Match?.HomeTeam?.logoUrl}
            alt={data?.Ticket?.Match?.HomeTeam?.name}
            className="absoulute inset-0 object-contain"
          />
        </div>
        <div className="w-1/3 h-full font-bold text-2xl text-white flex justify-center items-center">
          VS
        </div>
        <div className="w-2/3 h-full relative">
          <img
            src={data?.Ticket?.Match?.AwayTeam?.logoUrl}
            alt={data?.Ticket?.Match?.AwayTeam?.name}
            className="absoulute inset-0 object-contain"
          />
        </div>
      </div>
      <div className="flex-1 w-full h-full  flex flex-col gap-2 text-white font-bold px-2">
        <div className="flex w-full justify-between">
          <Calendar1Icon className="" />
          <div>{formatDate(data?.Ticket?.Match?.date)}</div>
        </div>
        <div className="flex w-full justify-between">
          <MapPin className="" />
          <div>{data?.Ticket?.Match?.venue}</div>
        </div>
        <div className="flex w-full justify-between">
          <NotebookTabsIcon className="" />
          <div>{data?.Ticket?.Match?.status}</div>
        </div>
        <div className="flex w-full justify-between">
          <Ticket className="" />
          <div>
            {data?.quantity} {jumlahTiket(data?.quantity)}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

// [
//     {
//         "id": 1,
//         "UserId": 1,
//         "TicketId": 3,
//         "quantity": 10,
//         "totalPrice": 2000000,
//         "purchaseDate": "2025-02-13T03:57:36.278Z",
//         "status": "Pending",
//         "createdAt": "2025-02-13T03:57:36.280Z",
//         "updatedAt": "2025-02-13T03:57:36.280Z",
//         "Ticket": {
//             "id": 3,
//             "MatchId": 8,
//             "category": "VIP",
//             "price": 200000,
//             "quantity": 50,
//             "remainingQuantity": 0,
//             "status": "Sold Out",
//             "createdAt": "2025-02-13T03:36:51.833Z",
//             "updatedAt": "2025-02-13T03:58:31.433Z",
//             "Match": {
//                 "id": 8,
//                 "HomeTeamId": 15,
//                 "AwayTeamId": 16,
//                 "date": "2025-02-23T00:00:00.000Z",
//                 "venue": "Wanda Metropoliano",
//                 "status": "Finished",
//                 "homeTeamScore": 1,
//                 "awayTeamScore": 0,
//                 "season": "2024",
//                 "createdAt": "2025-02-13T03:36:42.333Z",
//                 "updatedAt": "2025-02-13T14:31:21.478Z",
//                 "HomeTeam": {
//                     "id": 15,
//                     "name": "Everton",
//                     "city": "Liverpool",
//                     "stadium": "Goodison Park",
//                     "foundedYear": 1878,
//                     "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcbYrBuHs9ERzqwjovhSpYKYh4C6gDC-RkTkNLAf7gmfB_JiR5dF-VxR00YHCAmfS7cqHnpsx_uyFZ9anO2JU6EIP4dclYGc0ctn-3yfZRTZ9xtvrZI8A-yYnqv9gy8MeDhiasQoKhyphenhyphenCMsnLFc8I1C9b8lmgedpHgkGUyBgD9XlrKl7ZCowsYuoaTZGwk/s600/Burnley_FC.png",
//                     "createdAt": "2025-02-13T03:07:29.844Z",
//                     "updatedAt": "2025-02-13T03:07:29.844Z"
//                 },
//                 "AwayTeam": {
//                     "id": 16,
//                     "name": "Luton Town",
//                     "city": "Luton",
//                     "stadium": "Kenilworth Road",
//                     "foundedYear": 1885,
//                     "logoUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivkLU_9ow87msLxrlxSNkXF3OkBfL2g1hOV_UUvAzgd1DQvYD40BUU0tks6E-QGD9Q9XfbbV5l-X_fiOeXvAknuWQuVsGlf8z2hyphenhyphen4w4_aBeGNmKmAm0nEq0lHPbgUxOMbYM25nmp9DaAwn1fuZQAJ2heNki2MSccjSftEF_T-uRJArcQeB7m-oBKbxEsE/s600/Luton_Town.png",
//                     "createdAt": "2025-02-13T03:07:29.844Z",
//                     "updatedAt": "2025-02-13T03:07:29.844Z"
//                 }
//             }
//         }
//     },
