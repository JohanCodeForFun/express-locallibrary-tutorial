const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)

  // count of books in postgresql database
  // SELECT count(*) FROM books; // count rows in books table
  // SELECT * FROM books; // select all rows in books table

  // count of authors in postgresql database

  const [ numBooks 
  ] = await Promise.all([
    this.book_count()
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    // book_instance_count: numBookInstances,
    // book_instance_available_count: numBookInstancesAvailable,
    // authorcoint: numAuthors,
    // genre_count: numGenres,
  });
});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  try {
    console.log('getBooks');
    const books = await pool.query('SELECT * FROM books ORDER BY id ASC');
    res.status(200).json(books.rows);
  } catch (error) {
    console.log(error);
  }
});

exports.book_count = asyncHandler(async (req, res, next) => {
  try {
    console.log('getBooks');
    const books = await pool.query('SELECT count(*) FROM books');
    console.log("here", books)
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
  }
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
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
