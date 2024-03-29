'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn ('Expenses', 'EUserId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate :'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn ('Expenses', 'EUserId' )
  }
};
