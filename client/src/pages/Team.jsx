import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeam } from "../store/teamSlice";
import Swal from "sweetalert2";
import { LoaderIcon, LoaderPinwheel } from "lucide-react";
import CardTeam from "../components/CardTeam";

export default function Team() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.team);
  console.log(data, "ini data");

  useEffect(() => {
    dispatch(getTeam());
  }, [dispatch]);

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
    <div className="w-full min-h-screen bg-[#38003D] flex flex-col justify-start items-center py-8 px-40">
      <div className="font-extrabold text-6xl text-white mb-8">EPL Teams</div>
      {loading && <LoaderIcon className="w-12 h-12 animate-spin text-white" />}
      <div className="flex flex-wrap gap-6 justify-center items-center ">
        {data && data.length > 0 ? (
          data.map((el) => {
            return <CardTeam key={el.id} data={el} />;
          })
        ) : (
          <div className="text-white">No data</div>
        )}
      </div>
    </div>
  );
}
