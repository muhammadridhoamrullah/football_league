"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.Team, {
        as: "HomeTeam",
        foreignKey: "HomeTeamId",
      });
      Match.belongsTo(models.Team, {
        as: "AwayTeam",
        foreignKey: "AwayTeamId",
      });
      Match.hasMany(models.Ticket, { foreignKey: "MatchId" });
      Match.hasMany(models.Goal, { foreignKey: "MatchId" });
    }
  }
  Match.init(
    {
      HomeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Home Team is required",
          },
          notEmpty: {
            msg: "Home Team is required",
          },
        },
      },
      AwayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Away Team is required",
          },
          notEmpty: {
            msg: "Away Team is required",
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date Match is required",
          },
          notEmpty: {
            msg: "Date Match is required",
          },
        },
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Venue is required",
          },
          notEmpty: {
            msg: "Venue is required",
          },
        },
      },
      status: DataTypes.STRING,
      homeTeamScore: DataTypes.INTEGER,
      awayTeamScore: DataTypes.INTEGER,
      season: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Season is required",
          },
          notEmpty: {
            msg: "Season is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Match",
    }
  );
  return Match;
};
