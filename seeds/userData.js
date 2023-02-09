const { User } = require('../models');

const userdata = [
  {
    "username": "sal@hotmail.com",
    "password": "password12345"
  },
  {
    "username": "lernantino@gmail.com",
    "password": "password12345"
  },
  {
    "username": "amiko2k20@aol.com",
    "password": "password12345"
  },
  {
    "username": "jordan99@msn.com",
    "password": "password12345"
  },
  {
    "username": "the_blake@yahoo.com",
    "password": "password12345"
  }
];

const seedUsers = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

//const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
