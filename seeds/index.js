const sequelize = require('../config/connection');
const seedPosts = require('./postsData');
const seedUsers = require('./userData');
const seedComment = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComment();

  process.exit(0);
};

seedAll();
