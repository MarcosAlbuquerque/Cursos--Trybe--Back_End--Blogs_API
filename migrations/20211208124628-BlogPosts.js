'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },        
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        userId: Sequelize.INTEGER,
        published: Sequelize.DATE,
        updated: {
          type: Sequelize.DATE,
          allowNull: true,
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
