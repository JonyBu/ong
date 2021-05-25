'use strict';

const { newsMock } = require('../mocks')

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Entries', newsMock, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Entries', null, {});
  }
};
