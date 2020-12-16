export default function attractionModel(sequelize, DataTypes) {
  return sequelize.define('Attraction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    TripId: {
      // allowNull: true,
      type: DataTypes.INTEGER,

      // link the AttractionId column to the id column in the categories section
      // this is the same as a foreign key constraint
      references: {
        model: 'Trips',
        key: 'id',
      },
    },

  });
}
