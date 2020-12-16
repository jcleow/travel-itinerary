module.exports = {
  development: {
    username: process.env.USER,
    password: null,
    // Use "_development" suffix to indicate DB is for development purposes
    database: 'travel_itinerary_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};