module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
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

    await queryInterface.createTable('Attractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      TripId: {
        // allowNull: false,
        type: Sequelize.INTEGER,

        // link the AttractionId column to the id column in the categories section
        // this is the same as a foreign key constraint
        references: {
          model: 'Trips',
          key: 'id',
        },

      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trips');
    await queryInterface.dropTable('Attractions');
  },
};
