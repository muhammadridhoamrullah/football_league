import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    data: null,
    isLogin: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isLogin = true;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLogin = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginError } = loginSlice.actions;

export function doLogin(data) {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      console.log(data, "ini data login");

      const response = await instance.post("/login", data);
      console.log(response, "ini response di store");

      localStorage.access_token = response.data.access_token;

      dispatch(loginSuccess(response.data));
    } catch (error) {
      console.log(error, "ini error di store");

      dispatch(loginError(error.response.data.message));
    }
  };
}

export default loginSlice.reducer;
