import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    data: null,
    isRegistered: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isRegistered = true;
    },
    registerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isRegistered = false;
    },
  },
});

export const { registerRequest, registerSuccess, registerError } =
  registerSlice.actions;

export function doRegister(data) {
  return async (dispatch) => {
    try {
      dispatch(registerRequest());

      const tambahanInput = {
        ...data,
        role: "User",
        status: "Active",
        lastLogin: new Date(),
      };
      const response = await instance.post("/users", tambahanInput);

      dispatch(registerSuccess(response.data));
    } catch (error) {
      dispatch(registerError(error.message));
    }
  };
}

export default registerSlice.reducer;
