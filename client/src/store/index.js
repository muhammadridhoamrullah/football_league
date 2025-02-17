import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import teamReducer from "./teamSlice";
import detailTeamReducer from "./detailTeam";
import scheduleReducer from "./scheduleSlice";
import createMatchReducer from "./createMatchSlice";
import detailMatchReducer from "./detailMatchSlice";
import buyTicketReducer from "./buyTicketSlice";
import myTicketReducer from "./myTicketSlice";
import standingReducer from "./standingSlice";
import createTicketReducer from "./createTicketSlice";
import fullTimeReducer from "./fullTimeSlice";
import addGoalReducer from "./addGoalSlice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    team: teamReducer,
    detailTeam: detailTeamReducer,
    schedule: scheduleReducer,
    createMatch: createMatchReducer,
    detailMatch: detailMatchReducer,
    buyTicket: buyTicketReducer,
    myTicket: myTicketReducer,
    standing: standingReducer,
    createTicket: createTicketReducer,
    fullTime: fullTimeReducer,
    addGoal: addGoalReducer,
  },
});
