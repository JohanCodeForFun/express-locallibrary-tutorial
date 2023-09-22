var express = require('express');
var router = express.Router();



/* GET all books. */
router.get('/', function(req, res, next) {
  const getBooks = async (req, res) => {
    try {
      const books = await db.any('SELECT * FROM books');
      res.render('books', { title: 'Books', books: books });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
