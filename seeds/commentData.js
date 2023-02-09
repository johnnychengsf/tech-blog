const { Comment } = require('../models');

const commentdata = [
  {
    user_id: 5,
    post_id: 1,
    comment: 'I just learned about this in my class!',
  }
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
