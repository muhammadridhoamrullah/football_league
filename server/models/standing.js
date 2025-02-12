"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Standing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Standing.belongsTo(models.Team, { foreignKey: "TeamId" });
    }
  }
  Standing.init(
    {
      TeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Team Id is required",
          },
          notEmpty: {
            msg: "Team Id is required",
          },
        },
      },
      season: DataTypes.STRING,
      matchesPlayed: DataTypes.INTEGER,
      wins: DataTypes.INTEGER,
      draws: DataTypes.INTEGER,
      losses: DataTypes.INTEGER,
      goalsFor: DataTypes.INTEGER,
      goalsAgainst: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Standing",
    }
  );
  return Standing;
};
