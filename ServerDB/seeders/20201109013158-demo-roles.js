'use strict';

const { rolesMock } = require('../mocks');

module.exports = {

  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Roles', rolesMock, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Roles', null, {});
  }
};
