import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const myTicketSlice = createSlice({
  name: "myTicket",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    myTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    myTicketSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    myTicketError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { myTicketRequest, myTicketSuccess, myTicketError } =
  myTicketSlice.actions;

export function getAllMyTicket() {
  return async (dispatch) => {
    dispatch(myTicketRequest());

    try {
      const response = await instance.get("/ticket/my-tickets", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(myTicketSuccess(response.data));
    } catch (error) {
      dispatch(myTicketError(error.response.data.message));
    }
  };
}

export default myTicketSlice.reducer;
