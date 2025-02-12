import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import teamReducer from "./teamSlice";
import detailTeamReducer from "./detailTeam";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    team: teamReducer,
    detailTeam: detailTeamReducer,
  },
});
