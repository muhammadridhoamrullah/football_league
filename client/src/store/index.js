import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";

export default configureStore({
  reducer: {
    register: registerReducer,
  },
});

