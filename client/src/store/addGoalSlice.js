import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const addGoalSlice = createSlice({
  name: "addGoal",
  initialState: {
    loading: false,
    error: null,
    data: null,
    isSuccess: false,
  },
  reducers: {
    addGoalRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addGoalSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    addGoalError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    resetAddGoal: (state) => {
      state.error = null;
      state.data = null;
      state.isSuccess = false;
    },
  },
});

export const { addGoalRequest, addGoalSuccess, addGoalError, resetAddGoal } =
  addGoalSlice.actions;

export function goAddGoal(data, id) {
  return async (dispatch) => {
    dispatch(addGoalRequest());

    const editInput = {
      ...data,
      ScorerTeamId: parseInt(data.ScorerTeamId, 10),
      minute: parseInt(data.minute, 10),
    };

    try {
      const response = await instance.post(`/match/${id}/goal`, editInput, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(addGoalSuccess(response.data.message));
    } catch (error) {
      dispatch(addGoalError(error.response.data.message));
    }
  };
}

export default addGoalSlice.reducer;
