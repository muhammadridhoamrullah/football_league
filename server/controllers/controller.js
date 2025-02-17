// const { Op } = require("sequelize/core");
const { Op } = require("sequelize");
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
        where: {
          [Op.or]: [{ email: email || null }, { username: username || null }],
        },
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
        order: [["date", "ASC"]],
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
        include: {
          model: Team,
        },
        order: [["minute", "ASC"]],
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
      // const { idSeason } = req.params;
      const findAllStandings = await Standing.findAll({
        include: {
          model: Team,
        },
      });

      if (!findAllStandings) {
        throw { name: "DATA_NOT_FOUND" };
      }

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

      const findTicketById = await Ticket.findAll(
        {
          where: {
            MatchId: id,
          },
        },
        {
          include: {
            model: Match,
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
          },
        }
      );

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
      const { matchId } = req.params;
      const { quantity, category } = req.body;

      if (!quantity || !category) {
        throw { name: "MISSING_INPUT_CREATE_TICKET" };
      }

      // Cari pertandingan dan tiket yang tersedia berdasarkan matchId
      const findAvailableTicket = await Match.findByPk(matchId, {
        include: {
          model: Ticket,
          where: { category: category, status: "Available" },
        },
      });

      if (!findAvailableTicket) {
        throw { name: "TICKET_NOT_FOUND" };
      }

      // Pastikan pertandingan belum selesai
      if (findAvailableTicket.status === "Finished") {
        throw { name: "MATCH_FINISHED" };
      }

      // Cari tiket berdasarkan kategori
      const ticket = findAvailableTicket.Tickets.find(
        (t) => t.category === category
      );

      if (!ticket) {
        throw {
          name: "CATEGORY_TICKET_NOT_FOUND",
        };
      }

      // Validasi jumlah tiket yang diminta
      if (ticket.remainingQuantity === 0) {
        throw { name: "TICKET_SOLD_OUT" };
      }

      if (ticket.remainingQuantity < quantity) {
        throw {
          name: "INSUFFICIENT_TICKET_QUANTITY",
        };
      }

      // Proses pembelian tiket
      const totalPrice = ticket.price * quantity;

      const createPurchase = await TicketPurchase.create({
        UserId: req.user.id, // Asumsikan `req.user.id` adalah ID pengguna yang melakukan pembelian
        TicketId: ticket.id,
        quantity,
        totalPrice,
        purchaseDate: new Date(),
      });

      // Update sisa tiket setelah pembelian
      await Ticket.update(
        {
          remainingQuantity: ticket.remainingQuantity - quantity,
        },
        {
          where: {
            id: ticket.id,
          },
        }
      );

      // Jika jumlah tiket habis, update status tiket menjadi 'Sold Out'
      if (ticket.remainingQuantity - quantity === 0) {
        await Ticket.update(
          {
            status: "Sold Out",
          },
          {
            where: {
              id: ticket.id,
            },
          }
        );
      }

      // Response dengan detail pembelian tiket
      res.status(201).json({
        data: createPurchase,
        message: "Tiket berhasil dibeli",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyTickets(req, res, next) {
    try {
      const findMyTickets = await TicketPurchase.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: Ticket,
          include: {
            model: Match,
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
          },
        },
      });

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

  static async updateMatch(req, res, next) {
    try {
      const { id } = req.params;

      const { date, venue, season, status } = req.body;

      const findMatch = await Match.findByPk(id, {
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

      if (!findMatch) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const updateMatch = await Match.update(
        {
          date,
          venue,
          season,
          status,
          updatedAt: new Date(),
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({ message: "Successfully Update Match" });
    } catch (error) {
      next(error);
    }
  }

  static async createTicket(req, res, next) {
    try {
      const { id } = req.params;
      const { category, price, quantity } = req.body;

      if (!category || !price || !quantity) {
        throw { name: "MISSING_INPUT_CREATE_TICKET" };
      }

      const checkDoubleCategory = await Ticket.findOne({
        where: {
          MatchId: id,
          category,
        },
      });

      if (checkDoubleCategory) {
        throw { name: "DOUBLE_TICKET_CATEGORY" };
      }

      const createTicket = await Ticket.create({
        MatchId: id,
        category,
        price,
        quantity,
        remainingQuantity: quantity,
        status: "Available",
      });

      res.status(201).json(createTicket);
    } catch (error) {
      next(error);
    }
  }

  static async updateTicket(req, res, next) {
    try {
      const { id } = req.params;

      const { category, price, quantity, remainingQuantity, status } = req.body;

      const findTicket = await Ticket.findByPk(id, {
        include: {
          model: Match,
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
        },
      });

      if (!findTicket) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const updatedRemainingQuantity =
        quantity !== undefined ? quantity : remainingQuantity;

      const updateTicket = await Ticket.update(
        {
          category,
          price,
          quantity,
          remainingQuantity: updatedRemainingQuantity,
          status,
          updatedAt: new Date(),
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({ message: "Successfully Update Ticket" });
    } catch (error) {
      next(error);
    }
  }

  static async matchFullTime(req, res, next) {
    try {
      const { id } = req.params;

      // Mencari pertandingan berdasarkan ID
      const findMatch = await Match.findByPk(id, {
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

      // Jika pertandingan tidak ditemukan
      if (!findMatch) {
        throw { name: "DATA_NOT_FOUND" };
      }

      // Update skor pertandingan dan statusnya
      await Match.update(
        {
          status: "Finished",
          updatedAt: new Date(),
        },
        {
          where: {
            id,
          },
        }
      );

      // Mencari standing untuk tim tuan rumah dan tim tamu
      const findHomeTeamStanding = await Standing.findOne({
        where: {
          TeamId: findMatch.HomeTeamId,
        },
      });

      const findAwayTeamStanding = await Standing.findOne({
        where: {
          TeamId: findMatch.AwayTeamId,
        },
      });

      if (!findHomeTeamStanding || !findAwayTeamStanding) {
        throw { name: "STANDING_NOT_FOUND" };
      }

      const findGoal = await Goal.findAll({
        where: {
          MatchId: id,
        },
        include: {
          model: Team,
        },
      });

      const homeTeamScore =
        findGoal.filter((el) => el.ScorerTeamId === findMatch.HomeTeamId)
          .length || 0;

      console.log(homeTeamScore, "ini home team score");

      const awayTeamScore =
        findGoal.filter((el) => el.ScorerTeamId === findMatch.AwayTeamId)
          .length || 0;

      console.log(awayTeamScore, "ini away team score");

      // Menyesuaikan standing berdasarkan hasil pertandingan
      if (homeTeamScore > awayTeamScore) {
        findHomeTeamStanding.points += 3;
        findHomeTeamStanding.wins += 1;
        findAwayTeamStanding.losses += 1;
      } else if (homeTeamScore < awayTeamScore) {
        findAwayTeamStanding.points += 3;
        findAwayTeamStanding.wins += 1;
        findHomeTeamStanding.losses += 1;
      } else {
        findHomeTeamStanding.points += 1;
        findAwayTeamStanding.points += 1;
        findHomeTeamStanding.draws += 1;
        findAwayTeamStanding.draws += 1;
      }

      // Update jumlah pertandingan yang telah dimainkan
      findHomeTeamStanding.matchesPlayed += 1;
      findAwayTeamStanding.matchesPlayed += 1;

      // Update jumlah gol yang dicetak dan gol yang kebobolan
      findHomeTeamStanding.goalsFor += homeTeamScore;
      findHomeTeamStanding.goalsAgainst += awayTeamScore;
      findAwayTeamStanding.goalsFor += awayTeamScore;
      findAwayTeamStanding.goalsAgainst += homeTeamScore;

      // Simpan perubahan standing
      await findHomeTeamStanding.save();
      await findAwayTeamStanding.save();

      // Kirimkan respon berhasil dengan data terbaru
      return res.status(200).json({
        message: "Match has been finished",
        match: {
          id: findMatch.id,
          homeTeamScore,
          awayTeamScore,
          status: "Finished",
        },
        homeTeamStanding: findHomeTeamStanding,
        awayTeamStanding: findAwayTeamStanding,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createStanding(req, res, next) {
    try {
      const { season } = req.body;

      if (!season) {
        throw { name: "MISSING_INPUT_CREATE_STANDING" };
      }

      const findStanding = await Standing.findOne({
        where: {
          season,
        },
      });

      if (findStanding) {
        throw { name: "STANDING_ALREADY_CREATED" };
      }

      const findAllTeams = await Team.findAll();

      const standings = findAllTeams.map((team) => ({
        TeamId: team.id,
        season,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        matchesPlayed: 0,
      }));

      await Standing.bulkCreate(standings);

      res.status(200).json({ message: "Standings initialized successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async addGoal(req, res, next) {
    try {
      const { id } = req.params;

      const { ScorerTeamId, scorer, minute, assistBy } = req.body;

      if (!ScorerTeamId) {
        throw { name: "MISSING_INPUT_CREATE_GOAL" };
      }

      const findMatch = await Match.findByPk(id, {
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

      if (!findMatch) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const createGoal = await Goal.create({
        MatchId: id,
        ScorerTeamId,
        scorer,
        minute,
        assistBy,
      });

      res.status(201).json({
        message: "Goal created successfully",
        data: createGoal,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
