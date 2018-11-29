// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();

const User = require('../models/User');
const Trip = require('../models/Trip');
const Review = require('../models/Review');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

mongoose
  .connect(process.env.DBURLPROD, {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });


const reviews = [
  {
    place: 'London',
    title: 'The big city',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis ratione incidunt amet tempora, id exercitationem velit! Vero magnam quae aliquid delectus fuga cum optio. Porro dolorem rem exercitationem fugit recusandae!',
    images: [
      {
        imgPath: 'https://www.royalfashionist.com/wp-content/uploads/2017/09/london.jpg',
        imgName: 'London\'s eye',
      },
    ],
    location: {
      lat: '51.507351',
      lng: '-0.127758',
    },
  },
  {
    place: 'Berlin',
    title: 'The Wall',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis ratione incidunt amet tempora, id exercitationem velit! Vero magnam quae aliquid delectus fuga cum optio. Porro dolorem rem exercitationem fugit recusandae!',
    images: [
      {
        imgPath: 'https://news.usc.edu/files/2014/12/Berlin-Wall-1961-824x549.jpg',
        imgName: 'Berlin Wall',
      },
    ],
    location: {
      lat: '52.520008',
      lng: '13.404954',
    },
  },
  {
    place: 'Miami',
    title: 'The Paradise',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis ratione incidunt amet tempora, id exercitationem velit! Vero magnam quae aliquid delectus fuga cum optio. Porro dolorem rem exercitationem fugit recusandae!',
    images: [
      {
        imgPath: 'https://cdn.cnn.com/cnnnext/dam/assets/180614153928-03-miami---south-beach.jpg',
        imgName: 'Miami Beach',
      },
    ],
    location: {
      lat: '25.761681',
      lng: '-80.191788',
    },
  },
];

Review.deleteMany()
  .then(() => Review.create(reviews))
  .then((ReviewsCreated) => {
    console.log(`${ReviewsCreated.length} reviews created with the following id:`);
    console.log(ReviewsCreated.map(u => u._id));
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });


const trips = [
  {
    name: 'Mystery Trip #1',
    from: 'Madrid',
    to: 'Budapest',
    tips: 'Classic',
    price: 71,
    stars: 2,
    depart: '2018-12-10 07:00',
    return: '2018-12-17 08:00',
  },
  {
    name: 'Mystery Trip #2',
    from: 'Madrid',
    to: 'Bangkok',
    tips: 'Get ready for the jungle...',
    price: 453,
    stars: 5,
    depart: '2019-01-10 08:00',
    return: '2019-01-14 09:00',
    tickets: 0,
  },
  {
    name: 'Mystery Trip #3',
    from: 'Madrid',
    to: 'Los Angeles',
    tips: 'Top tier production!',
    price: 312,
    stars: 3,
    depart: '2019-02-01 12:00',
    return: '2019-02-06 17:00',
  },
  {
    name: 'Mystery Trip #4',
    from: 'Barcelona',
    to: 'Oslo',
    tips: 'It\'s cold out there, bring a coat!',
    price: 102,
    stars: 5,
    depart: '2019-01-21 12:00',
    return: '2019-01-28 08:00',
  },
  {
    name: 'Mystery Trip #5',
    from: 'Barcelona',
    to: 'Berlin',
    tips: 'Hearth of the culture',
    price: 91,
    stars: 4,
    depart: '2018-12-16 17:00',
    return: '2018-12-21 01:00',
  },
  {
    name: 'Mystery Trip #6',
    from: 'Barcelona',
    to: 'Tokyo',
    tips: 'The dreamland',
    price: 450,
    stars: 5,
    depart: '2019-02-21 18:00',
    return: '2019-02-28 15:00',
  },
];

Trip.deleteMany()
  .then(() => Trip.create(trips))
  .then((tripsCreated) => {
    console.log(`${tripsCreated.length} trips created with the following id:`);
    console.log(tripsCreated.map(u => u._id));
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });

const users = [
  {
    username: 'alice',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: 'bob',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
  },
];

User.create(users)
  .then((usersCreated) => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
