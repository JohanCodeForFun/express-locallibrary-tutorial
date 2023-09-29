const asyncHandler = require("express-async-handler");
const { bookinstance_count } = require("./bookinstanceController");

const connectionString = process.env.DB_CONNECTION_STRING;
const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString,
});

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)

  const [
    numBooks,
    numBookInstances,
  ] = await Promise.all([
    this.book_count(),
    bookinstance_count(),
  ]);


  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    // book_instance_available_count: numBookInstancesAvailable,
    // authorcoint: numAuthors,
    // genre_count: numGenres,
  });
});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  try {
    const books = await pool.query('SELECT * FROM books ORDER BY book_id ASC');

    res.render("book_list", {
      title: "Book List",
      book_list: books.rows
    });
  } catch (error) {
    console.log(error);
  }
});

exports.book_count = asyncHandler(async (req, res, next) => {
  try {
    const books = await pool.query('SELECT count(*) FROM books');
    console.log("query for book count", books.rows[0].count)
    return books.rows[0].count;

  } catch (error) {
    console.log(error);
  }
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  try {
    const book = await pool.query('SELECT * FROM books WHERE book_id = $1', [req.params.id]);
    console.log("query for book", req.params.id)

    // return book;

    res.render("book_detail", {
      title: "Book Detail",
      book: book.rows
    });
  } catch (error) {
    console.log(error);
  }
});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
