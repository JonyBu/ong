'use strict';

const { usersMock } = require('../mocks');

module.exports = {
	
	up: async (queryInterface, Sequelize) => {

		await queryInterface.bulkInsert('Users', usersMock, {});
	},

	down: async (queryInterface, Sequelize) => {
		
		await queryInterface.bulkDelete('Users', null, {});
	},
};
