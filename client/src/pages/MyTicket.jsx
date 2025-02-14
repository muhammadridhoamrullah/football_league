import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyTicket } from "../store/myTicketSlice";
import Swal from "sweetalert2";
import { Loader2Icon } from "lucide-react";
import CardMyTicket from "../components/CardMyTicket";

export default function MyTicket() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.myTicket);
  console.log(data, "ini data di my ticket");

  useEffect(() => {
    dispatch(getAllMyTicket());
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
    <div className="w-full min-h-screen bg-[#38003D] flex flex-col justify-start items-center py-10">
      {loading && (
        <Loader2Icon className="w-40 h-40 animate-spin text-white flex justify-center items-center" />
      )}
      <div className="w-full flex flex-wrap gap-10 px-10 justify-center items-center ">
        {data?.map((el) => {
          return <CardMyTicket key={el.id} data={el} />;
        })}
      </div>
    </div>
  );
}
