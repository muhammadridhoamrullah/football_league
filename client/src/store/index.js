import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});
