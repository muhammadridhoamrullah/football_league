import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../store/scheduleSlice";
import { Loader2Icon } from "lucide-react";
import CardSchedule from "../components/CardSchedule";

export default function Schedule() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.schedule);
  console.log(data, "ini data schedule");
  console.log(loading, "ini loading schedule");

  useEffect(() => {
    dispatch(getSchedule());
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#38003D]  flex flex-col justify-start items-center py-10 text-white">
      {loading && (
        <Loader2Icon className="flex justify-center items-center w-52 h-52 animate-spin text-white" />
      )}
      {data && data.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className="font-bold text-5xl flex justify-center items-center mb-5">
            Schedule EPL Season {data[0].season}
          </div>
          <div className=" w-full flex flex-wrap gap-8 px-10 justify-center items-center">
            {data.map((el) => {
              return <CardSchedule key={el.id} data={el} />;
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-white">
          No Data Available
        </div>
      )}
    </div>
  );
}
