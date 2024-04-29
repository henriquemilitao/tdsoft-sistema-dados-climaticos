'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('weather_data', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      city_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      temperature: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      humidity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wind_speed: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      wind_degrees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weather_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('weather_data');
    
  }
};
