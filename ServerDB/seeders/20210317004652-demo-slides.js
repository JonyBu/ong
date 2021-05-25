'use strict';

const { slidesMock } = require('../mocks')

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Slides', slidesMock, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Slides', null, {});
  }
};
