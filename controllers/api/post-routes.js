const router = require('express').Router();
const { Posts } = require('../../models');

router.get('/', async (req, res) => {
  console.log("going to create post");
});
// CREATE new Post
router.post('/', async (req, res) => {
  console.log("CREATE new Post");
  try {
    const dbData = await Posts.create({
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

// delete Post
router.delete('/', async (req, res) => {
  try {
    const dbData = await Posts.destroy(
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

// update Post
router.put('/', async (req, res) => {
  try {
    const dbData = await Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
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
/*
// show Post
router.get('/', async (req, res) => {
  console.log("create");
});
*/

// show Post
router.get('/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the Post
    try {
      const dbData = await Posts.findByPk(req.params.id);
      const item = dbData.get({ plain: true });
      res.send(item);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


module.exports = router;
