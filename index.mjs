/* eslint-disable no-console */
import db from './models/index.mjs';

const userInput = process.argv[2];

// Function that creates a trip
const tripCreation = () => {
  db.Trip
    .create({
      name: process.argv[3],
      options: { returning: true },
    })
    .then((trip) => {
      console.log(trip, 'test-1');
      console.log(trip.dataValues, 'test-2');
    })
    .catch((error) => console.log(error));
};
// Function that creates the trip & associated attraction
const tripAndAssociatedAttractionCreation = () => {
  db.Trip
    .create({
      name: process.argv[3],
      // Plural model name with propercase
      Attractions:
        [{
          name: process.argv[4],
        }],
      options: { returning: true },
    }, {
      include: [db.Attraction],
    })
    .then((trip) => {
      console.log(trip);
    })
    .catch((error) => console.log(error));
};

// Function that selects all the trips with trip name specified
const getTrip = () => {
  db.Trip.findAll({
    where: {
      name: [process.argv[3]],
    },
  })
    .then((trips) => console.log(trips, 'trip'))
    .catch((error) => console.log(error));
};

// if (userInput === 'create') {
//   tripCreation();
// } else if (userInput === 'add-attrac') {
//   tripAndAssociatedAttractionCreation();
// } else if (userInput === 'trip') {
//   getTrip();
// }

// Solution by using multiple creates
// /* eslint-disable no-console */
// import db from './models/index.mjs';

// const userInput = process.argv[2];

// if (userInput === 'create') {
//   db.Trip
//     .create({
//       name: process.argv[3],
//       options: { returning: true },
//     })
//     .then((trip) => {
//     })
//     .catch((error) => console.log(error));
// } else if (userInput === 'add-attrac') {
//   db.Trip
//     .create({
//       name: process.argv[3],
//       options: { returning: true },
//     })
//     .then((trip) => {
//       console.log('success');
//       console.log(trip);
//       db.Attraction.create({
//         TripId: trip.dataValues.id,
//         name: process.argv[4],
//       });
//     })
//     .catch((error) => console.log(error));
// }

const addAttraction = () => {
  db.Trip
    .findOne({
      where: {
        name: process.argv[3],
      },
    })
    .then((returnedTrip) => {
      // Docs on .create
      // https://sequelize.org/master/class/lib/model.js~Model.html#static-method-create
      // Return statement returns the Promise returned by the final .then
      console.log(returnedTrip, 'return Trip');
      db.Attraction.create(
        {
          name: process.argv[4],
        },
        {
          // Return only the id column
          returning: ['id'],
        },
      )
        .then((newAttraction) =>
        // Associate newItem with returnedCategory using the setCategory
        // method on newItem that Sequelize provides for us because of the
        // belongsTo association we defined in models/index.mjs.
        // This logic because less clunky after we introduce async/await syntax.
        // Docs: https://sequelize.org/master/manual/assocs.html#-code-foo-belongsto-bar---code-
          newAttraction.setTrip(returnedTrip).then(() => newAttraction));
    })
    .then((result) => {
      console.log('success!!');
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

if (userInput === 'create') {
  tripCreation();
} else if (userInput === 'add-attrac') {
  addAttraction();
}
