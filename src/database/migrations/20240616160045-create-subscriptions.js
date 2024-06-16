'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subscriptions', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      frequency: {
        type: Sequelize.ENUM,
        values: ['weekly', 'biweekly', 'monthly', 'semiannually'],
        allowNull: false,
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
      },
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('subscriptions');
  }
};
