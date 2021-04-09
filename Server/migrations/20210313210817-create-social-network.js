'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
  // Ticket approach
  /*await Promise.all([
      queryInterface.addColumn(
        'Organizations', 'facebook', { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'Organizations', 'instagram', { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'Organizations', 'linkedin', { type: Sequelize.STRING }
      )
    ])*/

  //Team approach
    await queryInterface.createTable('SocialNetworks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Organizations', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
  //Ticket approach
  /*await Promise.all([
      queryInterface.removeColumn('Organizations', 'facebook'),
      queryInterface.removeColumn('Organizations', 'instagram'),
      queryInterface.removeColumn('Organizations', 'linkedin'),
    ]) */

  //Team approach
    await queryInterface.dropTable('SocialNetworks');
  }
};