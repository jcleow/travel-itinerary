module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Attractions', 'category', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Attractions', 'category');
  },
};
