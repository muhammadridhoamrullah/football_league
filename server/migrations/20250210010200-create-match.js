"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      HomeTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      AwayTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      date: {
        type: Sequelize.DATE,
      },
      venue: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      homeTeamScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      awayTeamScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      season: {
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
    await queryInterface.dropTable("Matches");
  },
};
