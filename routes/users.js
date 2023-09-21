var express = require("express");
var router = express.Router();

const users = [
  {
    id: 1,
    username: "Johan",
    description: "I am a fullstack web developer",
  },
  {
    id: 2,
    username: "Charlotta",
    description: "I am a loving mother",
  },
  {
    id: 3,
    username: "Stephanie",
    description: "I am a cute daughter",
  },
];

// how do i pass this users array to the users.pug file?
// res.render('users', { title: 'Users' });
// res.render('users', { title: 'Users', users: users });
// res.render('users', { title: 'Users', users });
// res.render('users', { title: 'Users', users: users });

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users", { title: "Users", users: users });
});

module.exports = router;
