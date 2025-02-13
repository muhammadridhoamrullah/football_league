import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const detailTeamSice = createSlice({
  name: "detailTeam",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    detailTeamRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    detailTeamSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    detailTeamError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { detailTeamRequest, detailTeamSuccess, detailTeamError } =
  detailTeamSice.actions;

export function getDetailTeam(id) {
  return async (dispatch) => {
    dispatch(detailTeamRequest());
    console.log(id, "Jalan");

    try {
      const response = await instance.get(`/teams/${id}`);
      console.log(response.data.findTeamById, "ini response");

      dispatch(detailTeamSuccess(response.data.findTeamById));
    } catch (error) {
      dispatch(detailTeamError(error.response.data.message));
    }
  };
}

export default detailTeamSice.reducer;
