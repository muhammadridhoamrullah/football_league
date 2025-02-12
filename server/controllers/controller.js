const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {
  Goal,
  Match,
  Standing,
  Team,
  Ticket,
  TicketPurchase,
  User,
} = require("../models/index");
class Controller {
  static async registerForUser(req, res, next) {
    try {
      const { username, email, password, fullName, phoneNumber } = req.body;

      if (!username || !email || !password || !fullName || !phoneNumber) {
        throw { name: "MISSING_INPUT_REGISTER" };
      }

      const createUser = await User.create({
        username,
        email,
        password,
        fullName,
        phoneNumber,
        role: "User",
        lastLogin: new Date(),
      });

      let tampilUser = await User.findOne({
        where: {
          email,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      res.status(201).json(tampilUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, username, password } = req.body;

      if (!email && !username) {
        throw { name: "MISSING_EMAIL_USERNAME" };
      }

      if (!password) {
        throw { name: "MISSING_PASSWORD" };
      }

      const findUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (!findUser) {
        throw { name: "INVALID_LOGIN" };
      }

      const checkPassword = comparePassword(password, findUser.password);

      if (!checkPassword) {
        throw { name: "INVALID_LOGIN" };
      }

      const updatedUserLogin = await User.update(
        {
          lastLogin: new Date(),
        },
        {
          where: {
            id: findUser.id,
          },
        }
      );

      const access_token = signToken({
        id: findUser.id,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTeams(req, res, next) {
    try {
      const allTeams = await Team.findAll({
        order: [["name", "ASC"]],
      });

      res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  }

  static async getTeamById(req, res, next) {
    try {
      const { id } = req.params;

      const findTeamById = await Team.findByPk(id);
      console.log(findTeamById), "ini findteambyid";

      if (!findTeamById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      // const findTeamMatches = await Match.findAll({
      //   where: {
      //     $or: [{ HomeTeamId: id }, { AwayTeamId: id }],
      //   },
      // });

      // console.log(findTeamMatches, "ini findteammatches");

      // const findTeamStanding = await Standing.findOne({
      //   where: {
      //     TeamId: id,
      //   },
      // });

      // console.log(findTeamStanding, "ini findteamstanding");

      // const findTeamGoals = await Goal.findAll({
      //   where: {
      //     ScorerTeamId: id,
      //   },
      // });

      // console.log(findTeamGoals, "ini findteamgoals");

      res.status(200).json({
        findTeamById,
        // matches: findTeamMatches,
        // standing: findTeamStanding,
        // goals: findTeamGoals,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllMatches(req, res, next) {
    try {
      const findAllMatches = await Match.findAll({
        include: [
          {
            model: Team,
            as: "HomeTeam",
          },
          {
            model: Team,
            as: "AwayTeam",
          },
        ],
      });

      res.status(200).json(findAllMatches);
    } catch (error) {
      next(error);
    }
  }

  static async getMatchById(req, res, next) {
    try {
      const { id } = req.params;

      const findMatchById = await Match.findByPk(id, {
        include: [
          {
            model: Team,
            as: "HomeTeam",
          },

          {
            model: Team,
            as: "AwayTeam",
          },
        ],
      });

      if (!findMatchById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const findMatchGoals = await Goal.findAll({
        where: {
          MatchId: id,
        },
      });

      const findMatchTicket = await Ticket.findAll({
        where: {
          MatchId: id,
        },
      });

      res.status(200).json({
        findMatchById,
        goals: findMatchGoals,
        tickets: findMatchTicket,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStandings(req, res, next) {
    try {
      const findAllStandings = await Standing.findAll({
        include: {
          model: Team,
        },
      });

      if (findAllStandings.some((standing) => standing.points !== undefined)) {
        findAllStandings.sort((a, b) => {
          if (a.points !== b.points) {
            return b.points - a.points;
          }

          if (a.goalsFor !== b.goalsFor) {
            return b.goalsFor - a.goalsFor;
          }

          if (a.goalsAgainst !== b.goalsAgainst) {
            return a.goalsAgainst - b.goalsAgainst;
          }

          if (a.wins !== b.wins) {
            return b.wins - a.wins;
          }

          if (a.draws !== b.draws) {
            return b.draws - a.draws;
          }

          if (a.losses !== b.losses) {
            return a.losses - b.losses;
          }

          if (a.matchesPlayed !== b.matchesPlayed) {
            return a.matchesPlayed - b.matchesPlayed;
          }

          return a.Team.name.localeCompare(b.Team.name);
        });
      } else {
        findAllStandings.sort((a, b) => {
          return a.Team.name.localeCompare(b.Team.name);
        });
      }
      res.status(200).json(findAllStandings);
    } catch (error) {
      next(error);
    }
  }

  static async getAllTickets(req, res, next) {
    try {
      const allTickets = await Ticket.findAll({
        include: {
          model: Match,
        },
      });

      res.status(200).json(allTickets);
    } catch (error) {
      next(error);
    }
  }

  static async getTicketById(req, res, next) {
    try {
      const { id } = req.params;

      const findTicketById = await Ticket.findByPk(id, {
        include: {
          model: Match,
        },
      });

      if (!findTicketById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const findTicketPurchase = await TicketPurchase.findAll({
        where: {
          TicketId: id,
        },
      });

      res.status(200).json({
        findTicketById,
        purchases: findTicketPurchase,
      });
    } catch (error) {
      next(error);
    }
  }

  static async purchaseTicket(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const findTicket = await Ticket.findByPk(id, {
        include: {
          model: Match,
        },
      });

      if (!findTicket) {
        throw { name: "DATA_NOT_FOUND" };
      }

      if (findTicket.remainingQuantity === 0) {
        throw { name: "TICKET_SOLD_OUT" };
      }

      const createPurchase = await TicketPurchase.create({
        UserId: req.user.id,
        TicketId: id,
        quantity,
        totalPrice: findTicket.price * quantity,
        purchaseDate: new Date(),
      });

      const updateTicket = await Ticket.update(
        {
          remainingQuantity: findTicket.remainingQuantity - quantity,
        },
        {
          where: {
            id,
          },
        }
      );

      if (findTicket.remainingQuantity - quantity === 0) {
        const updateTicketStatus = await Ticket.update(
          {
            status: "Sold Out",
          },
          {
            where: {
              id,
            },
          }
        );
      }

      res
        .status(201)
        .json({ data: createPurchase, message: "Successfully Buy Ticket" });
    } catch (error) {
      next(error);
    }
  }

  static async getMyTickets(req, res, next) {
    try {
      const findMyTickets = await TicketPurchase.findAll(
        {
          where: {
            UserId: req.user.id,
          },
        },
        {
          include: {
            model: Ticket,
            include: {
              model: Match,
            },
          },
        }
      );

      res.status(200).json(findMyTickets);
    } catch (error) {
      next(error);
    }
  }

  static async createTeam(req, res, next) {
    try {
      const { name, city, stadium, foundedYear, logoUrl } = req.body;

      if (!name || !city || !stadium || !foundedYear || !logoUrl) {
        throw { name: "MISSING_INPUT_REGISTER" };
      }

      const createTeam = await Team.create({
        name,
        city,
        stadium,
        foundedYear,
        logoUrl,
      });

      res.status(201).json(createTeam);
    } catch (error) {
      next(error);
    }
  }

  static async createMatch(req, res, next) {
    try {
      const { HomeTeamId, AwayTeamId, date, venue, season } = req.body;

      if (!HomeTeamId || !AwayTeamId || !date || !venue || !season) {
        throw { name: "MISSING_INPUT_CREATE_MATCH" };
      }

      const createMatch = await Match.create({
        HomeTeamId,
        AwayTeamId,
        date,
        venue,
        season,
        status: "Scheduled",
      });

      res.status(201).json(createMatch);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
