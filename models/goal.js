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
      MatchId: DataTypes.INTEGER,
      ScorerTeamId: DataTypes.INTEGER,
      scorer: DataTypes.STRING,
      minute: DataTypes.INTEGER,
      assistBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Goal",
    }
  );
  return Goal;
};
