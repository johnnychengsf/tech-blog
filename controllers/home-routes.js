const router = require('express').Router();
const { Posts, User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbData = await Posts.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [['updated_at', 'DESC']],
      attributes: ['id', 'title', 'content', 'user_id', 'created_at', 'updated_at']
    });

    const items = dbData.map((item) =>
      item.get({ plain: true })
    );

    let headerName = "The Tech Blog";
    
    //if (req.session.loggedIn) {
    if (req.session.loggedIn > 0) {  
      headerName = "Your Dashboard";
    }
    res.render('homepage', {
      headername: headerName,
      items,
      loggedIn: (req.session.loggedIn > 0),
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

router.get('/login', (req, res) => {
  //if (req.session.loggedIn) {
  if (req.session.loggedIn > 0) {
    res.redirect('/');
    return;
  }

  res.render('login',{headername: "The Tech Blog"});
});

module.exports = router;
