'use strict';

const { organizationMock } = require('../mocks');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Organizations', organizationMock, {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};
