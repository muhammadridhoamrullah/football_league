"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Goals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MatchId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Matches",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      ScorerTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      scorer: {
        type: Sequelize.STRING,
      },
      minute: {
        type: Sequelize.INTEGER,
      },
      assistBy: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Goals");
  },
};
