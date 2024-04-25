'use strict';
const fs = require('fs').promises
const {hashPassword} = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(await fs.readFile('./data/post.json', 'utf-8'))
    data = data.map(el=>{
     delete el.id
     el.createdAt = new Date
     el.updatedAt = new Date
     return el
    })
    await queryInterface.bulkInsert('Posts', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', null, {})
  }
};