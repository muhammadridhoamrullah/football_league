"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Match, { as: "homeTeam", foreignKey: "HomeTeamId" });
      Team.hasMany(models.Match, { as: "awayTeam", foreignKey: "AwayTeamId" });
      Team.hasOne(models.Standing, { foreignKey: "TeamId" });
    }
  }
  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          msg: "Team name already exists",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Team name is required",
          },
          notEmpty: {
            msg: "Team name is required",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "City is required",
          },
          notEmpty: {
            msg: "City is required",
          },
        },
      },
      stadium: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stadium is required",
          },
          notEmpty: {
            msg: "Stadium is required",
          },
        },
      },
      foundedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Founded year is required",
          },
          notEmpty: {
            msg: "Founded year is required",
          },
        },
      },
      logoUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Logo URL is required",
          },
          notEmpty: {
            msg: "Logo URL is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
