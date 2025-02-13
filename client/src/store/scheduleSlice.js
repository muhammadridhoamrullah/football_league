import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    scheduleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    scheduleSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    scheduleError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { scheduleRequest, scheduleSuccess, scheduleError } =
  scheduleSlice.actions;

export function getSchedule() {
  return async (dispatch) => {
    dispatch(scheduleRequest());

    try {
      const response = await instance.get("/matches");

      dispatch(scheduleSuccess(response.data));
    } catch (error) {
      dispatch(scheduleError(error.response.data.message));
    }
  };
}

export default scheduleSlice.reducer;
