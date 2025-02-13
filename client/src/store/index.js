import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import teamReducer from "./teamSlice";
import detailTeamReducer from "./detailTeam";
import scheduleReducer from "./scheduleSlice";
import createMatchReducer from "./createMatchSlice";
import detailMatchReducer from "./detailMatchSlice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    team: teamReducer,
    detailTeam: detailTeamReducer,
    schedule: scheduleReducer,
    createMatch: createMatchReducer,
    detailMatch: detailMatchReducer,
  },
});
