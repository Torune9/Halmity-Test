'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Asep',
        username: 'asep',
        preferred_timezone: 'Asia/Jakarta',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Agus',
        username: 'agus',
        preferred_timezone: 'Asia/Jayapura',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ujang',
        username: 'ujang',
        preferred_timezone: 'Pacific/Auckland',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
