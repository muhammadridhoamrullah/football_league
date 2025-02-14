import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const createTicketSlice = createSlice({
  name: "createTicket",
  initialState: {
    loading: false,
    error: null,
    data: null,
    isSuccess: false,
  },
  reducers: {
    createTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTicketSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    createTicketError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    resetCreateTicket: (state) => {
      state.error = null;
      state.data = null;
      state.isSuccess = false;
    },
  },
});

export const {
  createTicketRequest,
  createTicketSuccess,
  createTicketError,
  resetCreateTicket,
} = createTicketSlice.actions;

export function goCreateTicket(data, id) {
  return async (dispatch) => {
    dispatch(createTicketRequest());

    const editInput = {
      ...data,
      price: parseInt(data.price, 10),
      quantity: parseInt(data.quantity, 10),
    };

    try {
      const response = await instance.post(`/tickets/${id}`, editInput, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(createTicketSuccess(response.data));
    } catch (error) {
      dispatch(createTicketError(error.response.data.message));
    }
  };
}

export default createTicketSlice.reducer;
