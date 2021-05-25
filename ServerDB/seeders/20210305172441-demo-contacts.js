'use strict';

const { contactsMock } = require('../mocks');

module.exports = {
  
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Contacts', contactsMock, {});
  },
  
  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Contacts', null, {});
  }
};
