const router = require('express').Router();
const { Posts, User } = require('../models');

console.log('dashboard');
// GET all posts for dashboard
router.get('/', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!(req.session.loggedIn > 0)) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the blog
    try {

      const dbData = await Posts.findAll({
        where: {
          user_id: req.session.loggedIn
        }
      });
  
      const items = dbData.map((item) =>
        item.get({ plain: true })
      );

      res.render('dashboard', {
        items,
        headername:"Your Dashboard",
        loggedIn: (req.session.loggedIn > 0) 
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
