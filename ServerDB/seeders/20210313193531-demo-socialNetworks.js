'use strict';

const { socialNetworksMock } = require('../mocks')

module.exports = {
  
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('SocialNetworks', socialNetworksMock, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('SocialNetworks', null, {});
  }
};
