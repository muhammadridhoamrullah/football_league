import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailMatch } from "../store/detailMatchSlice";
import { data, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Loader2Icon } from "lucide-react";
import { goBuyTicket, resetStateSuccess } from "../store/buyTicketSlice";

export default function BuyTicket() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: dataDetailMatch,
    loading: loadingDetailMatch,
    error: errorDetailMatch,
  } = useSelector((state) => state.detailMatch);
  console.log(dataDetailMatch, "ini data detail match");
  const { loading, data, error, isSuccess } = useSelector(
    (state) => state.buyTicket
  );
  console.log(isSuccess, "ini isSuccess");
  console.log(error, "ini error");

  const [formBuyTicket, setFormBuyTicket] = useState({
    quantity: "",
    category: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormBuyTicket({
      ...formBuyTicket,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(goBuyTicket(formBuyTicket, id));
  }

  useEffect(() => {
    dispatch(getDetailMatch(id));
  }, [id]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
    dispatch(resetStateSuccess());
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/my-ticket");
      dispatch(resetStateSuccess());
    }
  }, [isSuccess]);

  return (
    <div className="w-full h-[551px] flex justify-center items-start pt-4 bg-[#38003D] text-white">
      {loadingDetailMatch ? (
        <Loader2Icon className="flex justify-center items-center w-40 h-40 animate-spin text-white" />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="w-[550px] h-96 border-2 border-white rounded-lg flex flex-col justify-between items-center p-4 font-bold text-xl">
            <div className="flex justify-center items-center gap-3  w-full  ">
              <div>{dataDetailMatch?.findMatchById?.HomeTeam?.name}</div>
              <div>x</div>
              <div>{dataDetailMatch?.findMatchById?.AwayTeam?.name}</div>
            </div>
            <div className=" flex flex-col gap-3 justify-center items-center w-full">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                onChange={changeHandler}
                value={formBuyTicket.quantity}
                className="w-1/2 border border-white h-10 rounded-lg p-2 text-center "
              />
            </div>
            <div className=" flex flex-col gap-3 justify-center items-center w-full">
              <label>Category</label>
              <select
                name="category"
                id="category"
                onChange={changeHandler}
                value={formBuyTicket.category}
                className="w-1/2 border border-white h-12 rounded-lg p-2 text-center"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {dataDetailMatch?.tickets.length > 0 ? (
                  dataDetailMatch?.tickets?.map((el) => {
                    return (
                      <option
                        className="bg-[#38003D]"
                        key={el.id}
                        value={el.category}
                      >
                        {el.category}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>No Ticket Available</option>
                )}
              </select>
            </div>
            <button
              type="submit"
              className="w-1/2 h-12 rounded-lg bg-green-800 hover:bg-green-700 cursor-pointer"
            >
              Buy Ticket
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// [
//     {
//         "id": 1,
//         "MatchId": 7,
//         "category": "Economy",
//         "price": 100000,
//         "quantity": 100,
//         "remainingQuantity": 100,
//         "status": "Available",
//         "createdAt": "2025-02-13T03:35:48.161Z",
//         "updatedAt": "2025-02-13T03:35:48.161Z"
//     },
//     {
//         "id": 2,
//         "MatchId": 7,
//         "category": "VIP",
//         "price": 200000,
//         "quantity": 50,
//         "remainingQuantity": 50,
//         "status": "Available",
//         "createdAt": "2025-02-13T03:35:57.729Z",
//         "updatedAt": "2025-02-13T03:35:57.729Z"
//     }
// ]
