import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const addScoreSlice = createSlice({
  name: "addScore",
  initialState: {
    loading: false,
    error: null,
    data: null,
    isSuccess: false,
  },
  reducers: {
    addScoreRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addScoreSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    addScoreError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    resetAddScore: (state) => {
      state.error = null;
      state.data = null;
      state.isSuccess = false;
    },
  },
});

export const {
  addScoreRequest,
  addScoreSuccess,
  addScoreError,
  resetAddScore,
} = addScoreSlice.actions;

export function goAddScore(data, id) {
  return async (dispatch) => {
    dispatch(addScoreRequest());
    console.log(data, "ini data add score");

    const editInput = {
      homeTeamScore: parseInt(data.homeTeamScore, 10),
      awayTeamScore: parseInt(data.awayTeamScore, 10),
    };

    console.log(editInput, "ini edit input di add score");

    try {
      console.log("Jalan");

      const response = await instance.put(`/match/${id}/score`, editInput, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(response.data, "ini response di add score");

      dispatch(addScoreSuccess(response.data));
    } catch (error) {
      dispatch(addScoreError(error.response.data.message));
    }
  };
}

export default addScoreSlice.reducer;
