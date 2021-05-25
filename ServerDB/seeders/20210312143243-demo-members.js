'use strict';

const { membersMock } = require('../mocks');

module.exports = {
	
	up: async (queryInterface, Sequelize) => {

		await queryInterface.bulkInsert('Members', membersMock, {});
	},

	down: async (queryInterface, Sequelize) => {
		
		await queryInterface.bulkDelete('Members', null, {});
	},
};
