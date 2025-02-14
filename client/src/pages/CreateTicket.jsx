import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailMatch } from "../store/detailMatchSlice";
import Swal from "sweetalert2";

export default function CreateTicket() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    loading: loadingDetailMatch,
    error: errorDetailMatch,
    data: dataDetailMatch,
  } = useSelector((state) => state.detailMatch);

  const [formCreateTicket, setFormCreateTicket] = useState({
    category: "",
    price: "",
    quantity: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormCreateTicket({
      ...formCreateTicket,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    
  }

  useEffect(() => {
    dispatch(getDetailMatch(id));
  }, [id]);

  useEffect(() => {
    if (errorDetailMatch) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorDetailMatch,
      });
    }
  }, [errorDetailMatch]);

  return (
    <div className="w-full h-[551px] bg-[#38003D] flex justify-center items-start py-10 ">
      <div className="w-[550px] h-fit border border-white rounded-lg flex flex-col justify-between items-center gap-4 p-4">
        <div className="text-white font-bold text-2xl">
          {dataDetailMatch?.findMatchById?.HomeTeam?.name} x{" "}
          {dataDetailMatch?.findMatchById?.AwayTeam?.name}
        </div>

        <div className="w-full flex flex-col gap-2 justify-center items-center text-white font-bold">
          <label>Category</label>
          <select
            name="category"
            id="category"
            className="w-52 bg-transparent border border-white h-10 p-2 rounded-md text-center "
          >
            <option
              className="flex justify-center items-center"
              value=""
              disabled
            >
              Select Category
            </option>

            <option className="font-bold bg-[#34003D]" value="VIP">
              VIP
            </option>
            <option className="font-bold bg-[#34003D]" value="Economy">
              Economy
            </option>
          </select>
        </div>
        <div className="w-full flex flex-col gap-2 justify-center items-center text-white font-bold">
          <label>Price</label>
          <input
            type="number"
            name="price"
            id="price"
            className="w-52 bg-transparent border border-white h-10 p-2 rounded-md text-center"
          />
        </div>
        <div className="w-full flex flex-col gap-2 justify-center items-center text-white font-bold">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="w-52 bg-transparent border border-white h-10 p-2 rounded-md text-center"
          />
        </div>
        <button
          type="submit"
          className="w-52 h-12 bg-green-800 hover:bg-green-700 rounded-lg font-bold text-white mt-5"
        >
          Create Ticket
        </button>
      </div>
    </div>
  );
}
