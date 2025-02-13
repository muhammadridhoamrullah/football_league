"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Goal.belongsTo(models.Match, { foreignKey: "MatchId" });
      Goal.belongsTo(models.Team, { foreignKey: "ScorerTeamId" });
    }
  }
  Goal.init(
    {
      MatchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Match is required",
          },
          notEmpty: {
            msg: "Match is required",
          },
        },
      },
      ScorerTeamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      scorer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      minute: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assistBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Goal",
    }
  );
  return Goal;
};
