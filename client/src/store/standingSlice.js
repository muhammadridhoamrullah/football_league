import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const standingSlice = createSlice({
  name: "standing",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {
    getStandingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStandingSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getStandingError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getStandingRequest, getStandingSuccess, getStandingError } =
  standingSlice.actions;

export function fetchStanding() {
  return async (dispatch) => {
    dispatch(getStandingRequest());

    try {
      const response = await instance.get(`/standings`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(getStandingSuccess(response.data));
    } catch (error) {
      dispatch(getStandingError(error.response.data.message));
    }
  };
}

export default standingSlice.reducer;
