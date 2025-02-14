import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const buyTicketSlice = createSlice({
  name: "buyTicket",
  initialState: {
    loading: false,
    error: null,
    data: null,
    isSuccess: false,
  },
  reducers: {
    buyTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    buyTicketSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    buyTicketError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    resetStateSuccess: (state) => {
      state.isSuccess = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const {
  buyTicketRequest,
  buyTicketSuccess,
  buyTicketError,
  resetStateSuccess,
} = buyTicketSlice.actions;

export function goBuyTicket(data, id) {
  return async (dispatch) => {
    dispatch(buyTicketRequest());
    console.log(data, "ini data buy ticket");
    console.log(id, "ini id");

    try {
      const response = await instance.post(`/ticket/purchase/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      console.log(response, "ini response di store");

      dispatch(buyTicketSuccess(response.data));
    } catch (error) {
      dispatch(buyTicketError(error.response.data.message));
    }
  };
}

export default buyTicketSlice.reducer;
