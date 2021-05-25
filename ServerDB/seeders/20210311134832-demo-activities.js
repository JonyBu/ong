'use strict';

const { activitiesMock } = require('../mocks');

module.exports = {

  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Activities', activitiesMock, {});
  },

  down: async (queryInterface, Sequelize) => { 
    
    await queryInterface.bulkDelete('Activities', null, {});
  }
};
