"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Standings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      season: {
        type: Sequelize.STRING,
      },
      matchesPlayed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      draws: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      losses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goalsFor: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goalsAgainst: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("Standings");
  },
};
