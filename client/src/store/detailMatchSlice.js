import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const detailMatchSice = createSlice({
  name: "detailMatch",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    getDetailMatchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDetailMatchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getDetailMatchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDetailMatchRequest,
  getDetailMatchSuccess,
  getDetailMatchError,
} = detailMatchSice.actions;

export function getDetailMatch(id) {
  return async (dispatch) => {
    dispatch(getDetailMatchRequest());

    try {
      const response = await instance.get(`/matches/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(getDetailMatchSuccess(response.data));
    } catch (error) {
      dispatch(getDetailMatchError(error.response.data.message));
    }
  };
}

export default detailMatchSice.reducer;
