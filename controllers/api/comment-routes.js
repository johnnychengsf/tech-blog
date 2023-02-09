const router = require('express').Router();
const Comment = require('../../models/Comment');
const User = require('../../models/User');
const Posts = require('../../models/Posts');

// delete comment
router.delete('/', async (req, res) => {

  if (!(req.session.loggedIn > 0)) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the comment
    const [post_id, user_id] = req.body.comment_id.split('-');
    if (req.session.loggedIn == user_id) {
      try {
        const dbData = await Comment.destroy(
          {
            where: {id: post_id}
          }
        );

        req.session.save(() => {
          res.status(200).json(dbData);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      console.log("different user, no allow to delete!");
    }
  }
});

// change comment
router.put('/', async (req, res) => {

  // If the user is not logged in, redirect the user to the login page
  if (!(req.session.loggedIn > 0)) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the comment
    const [post_id, user_id] = req.body.comment_id.split('-');
    if (req.session.loggedIn == user_id) {
      try {
        
        const dbData = await Comment.update(
          {
            comment: req.body.comment,
          },
          {
            where: {id: post_id}
          }
        );

        req.session.save(() => {
          res.status(200).json(dbData);
        });
        
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      console.log("different user, no allow to change!");
      res.status(500).json(err);
    }
  }
});
// new comment
router.post('/', async (req, res) => {

  // If the user is not logged in, redirect the user to the login page
  if (!(req.session.loggedIn > 0)) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the blog

    try {
      const dbData = await Comment.create({
        user_id: req.session.loggedIn,
        post_id: req.body.post_id,
        comment: req.body.comment,
      });
  
      req.session.save(() => {
        res.status(200).json(dbData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// jump to Comment page
router.get('/:id', async (req, res) => {
  
  let headerName = "The Tech Blog";
  // If the user is not logged in, redirect the user to the login page
  if (!(req.session.loggedIn>0)) {
    try { 
      res.render('homepage', {
        headername: headerName,
        loggedIn: (req.session.loggedIn > 0)
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    // If the user is logged in, allow them to view the Comment
    try {
      
      const dbData = await Posts.findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: User,
          attributes: ['username']
        }],
        order: [['updated_at', 'DESC']],
        attributes: ['id', 'title', 'content', 'user_id', 'created_at', 'updated_at']
      });
      if (dbData.length <= 0) {
        res.render('homepage', {
          headername: headerName,
          loggedIn: (req.session.loggedIn > 0)
        });
      }
      item = dbData.get({ plain: true });
      
      const dbData_2 = await Comment.findAll({
        where: {
          post_id: item.id
        },
        include: [{
          model: User,
          attributes: ['username']
        }],
        order: [['updated_at', 'DESC']],
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at', 'updated_at']
      });

      item.comment = dbData_2.map((item) =>
        item.get({ plain: true })
      );
      res.render('homepage-comment', {
        item,
        headername: headerName,
        loggedIn: (req.session.loggedIn > 0),
        newComment: (req.session.newComment > 0)
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

/*
// CREATE new comment
router.post('/', async (req, res) => {
  try {
    const dbData = await Comment.create({
      user_id: req.session.loggedIn,
      title: req.body.title,
      content: req.body.content,
    });

    req.session.save(() => {
      res.status(200).json(dbData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete comment
router.delete('/', async (req, res) => {
  try {
    const dbData = await Comment.destroy(
      {
        where: {id: req.body.id}
      }
    );

    req.session.save(() => {
      res.status(200).json(dbData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// show Comment
router.get('/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the Comment
    try {
      const dbData = await Comment.findByPk(req.params.id);
      const item = dbData.get({ plain: true });
      res.send(item);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

*/
module.exports = router;
