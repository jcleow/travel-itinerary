import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import tripModel from './trip.mjs';
import attractionModel from './attraction.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Trip = tripModel(sequelize, Sequelize.DataTypes);
db.Attraction = attractionModel(sequelize, Sequelize.DataTypes);

db.Trip.hasMany(db.Attraction);
db.Attraction.belongsTo(db.Trip);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
