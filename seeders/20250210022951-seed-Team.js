"use strict";
let data = require("../db/teams.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Teams", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teams", null, {});
  },
};
