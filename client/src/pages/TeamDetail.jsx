import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getDetailTeam } from "../store/detailTeam";
import { Loader, Loader2, Loader2Icon, LoaderPinwheel } from "lucide-react";

export default function TeamDetail() {
  const { id } = useParams();
  console.log(id, "ini id");

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.detailTeam);
  console.log(data, "ini data detail");

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(getDetailTeam(id));
  }, [id]);

  return (
    <div className="w-full h-[551px] flex justify-center items-start py-10 bg-[#38003D] text-white">
      {loading ? (
        <Loader2Icon className="flex justify-center items-center w-52 h-52 animate-spin text-white" />
      ) : data ? (
        <div className="w-96 h-96 border border-white rounded-lg flex flex-col justify-between">
          <div className="flex-2 rounded-t-lg overflow-hidden">
            <img
              src={data.logoUrl}
              alt={data.name}
              className="w-full h-full object-contain py-2"
            />
          </div>
          <div className="flex-1 rounded-b-lg flex flex-col justify-between  p-4 font-bold text-lg ">
            <div className="w-full flex ">
              <div className="w-1/3 ">Club Name</div>
              <div>: {data.name}</div>
            </div>
            <div className="w-full flex">
              <div className="w-1/3 ">City</div>
              <div>: {data.city}</div>
            </div>
            <div className="w-full flex">
              <div className="w-1/3">Stadium</div>
              <div>: {data.stadium}</div>
            </div>
            <div className="w-full flex">
              <div className="w-1/3">Founded</div>
              <div>: {data.foundedYear}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-extrabold text-xl text-white flex justify-center items-center">
          No data available
        </div>
      )}
    </div>
  );
}
