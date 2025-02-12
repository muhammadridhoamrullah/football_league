import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    teamRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    teamSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    teamError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { teamRequest, teamSuccess, teamError } = teamSlice.actions;

export function getTeam() {
  return async (dispatch) => {
    dispatch(teamRequest());

    try {
      const response = await instance.get("/teams");

      dispatch(teamSuccess(response.data));
    } catch (error) {
      dispatch(teamError(error.response.data.message));
    }
  };
}

export default teamSlice.reducer;
