'use strict';

const { categoriesMock } = require('../mocks');


module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Categories', categoriesMock , {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};