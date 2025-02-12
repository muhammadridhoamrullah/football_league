import { Link } from "react-router-dom";

export default function CardTeam({ data }) {
  return (
    <div className="w-64 h-64 border border-white rounded-lg flex flex-col justify-between">
      <div className="flex-2 rounded-t-lg overflow-hidden mt-4 ">
        <Link to={`/team/${data.id}`}>
          <img
            src={data.logoUrl}
            alt={data.name}
            className="w-full h-full object-contain rounded-full"
          />
        </Link>
      </div>
      <div className="flex-1 rounded-b-lg flex items-center justify-center font-bold text-lg text-white">
        {data.name}
      </div>
    </div>
  );
}
