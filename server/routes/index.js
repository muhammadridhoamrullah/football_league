const { Controller } = require("../controllers/controller");

const router = require("express").Router();

// Public Endpoints:
// POST /register
// POST /login
// GET /teams
// GET /teams/:id
// GET /matches
// GET /matches/:id
// GET /standings
// GET /tickets
// GET /tickets/:id

// router.post("/register", Controller.registerForUser);
// router.post("/login", Controller.login);
// router.get("/teams", Controller.getAllTeams);
// router.get("/teams/:id", Controller.getTeamById);
// router.get("/matches", Controller.getAllMatches);
// router.get("/matches/:id", Controller.getMatchById);
// router.get("/standings", Controller.getStandings);
// router.get("/tickets", Controller.getAllTickets);
// router.get("/tickets/:id", Controller.getTicketById);

// Authentication Required Endpoints:
// POST /ticket/purchase
// GET /ticket/my-tickets
// POST /register-admin

// router.post("/register-admin", Controller.registerForAdmin);
// router.post("/ticket/purchase", Controller.purchaseTicket);
// router.get("/ticket/my-tickets", Controller.getMyTickets);

// Admin Authorization Required Endpoints:
// POST /teams
// POST /matches
// PUT /matches/:id
// POST /tickets
// PUT /tickets/:id
// PUT /matches/:id/score

// router.post("/teams", Controller.createTeam);
// router.post("/matches", Controller.createMatch);
// router.put("/matches/:id", Controller.updateMatch);
// router.post("/tickets", Controller.createTicket);
// router.put("/tickets/:id", Controller.updateTicket);
// router.put("/matches/:id/score", Controller.updateMatchScore);

module.exports = {
  router,
};
