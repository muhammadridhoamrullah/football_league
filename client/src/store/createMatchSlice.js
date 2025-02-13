import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const createMatchSlice = createSlice({
  name: "createMatch",
  initialState: {
    data: null,
    error: null,
    loading: false,
    isCreate: false,
  },
  reducers: {
    createMatchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createMatchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isCreate = true;
    },
    createMatchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isCreate = false;
    },
  },
});

export const { createMatchRequest, createMatchSuccess, createMatchError } =
  createMatchSlice.actions;

export function doCreateMatch(data) {
  return async (dispatch) => {
    dispatch(createMatchRequest());
    console.log(data, "ini data createMatchReq");

    const editInput = {
      ...data,
      HomeTeamId: parseInt(data.HomeTeamId, 10),
      AwayTeamId: parseInt(data.AwayTeamId, 10),
      date: new Date(data.date).toISOString(),
    };

    console.log(editInput, "ini edit input");

    try {
      console.log("Jalan");

      const response = await instance.post("/matches", editInput, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log("Tidak Jalan");

      console.log(response.data, "ini response create match");

      dispatch(createMatchSuccess(response.data));
    } catch (error) {
      console.log(error.response.data.message, "ini error create match");

      dispatch(createMatchError(error.response.data.message));
    }
  };
}

export default createMatchSlice.reducer;
