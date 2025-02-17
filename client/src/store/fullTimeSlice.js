import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const fullTimeSlice = createSlice({
  name: "fullTime",
  initialState: {
    loading: false,
    error: null,
    data: null,
    isSuccess: false,
  },
  reducers: {
    fullTimeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fullTimeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    fullTimeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    resetFullTime: (state) => {
      state.error = null;
      state.data = null;
      state.isSuccess = false;
    },
  },
});

export const {
  fullTimeRequest,
  fullTimeSuccess,
  fullTimeError,
  resetFullTime,
} = fullTimeSlice.actions;

export function goFullTime(id) {
  return async (dispatch) => {
    dispatch(fullTimeRequest());

    try {
      const response = await instance.put(`/match/${id}/fullTime`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fullTimeSuccess(response.data.message));
    } catch (error) {
      dispatch(fullTimeError(error.response.data.message));
    }
  };
}

export default fullTimeSlice.reducer;
