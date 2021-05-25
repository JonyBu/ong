'use strict';

const { testimonialsMock } = require('../mocks')

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Testimonials', testimonialsMock, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Testimonials', null, {});
  }
};
