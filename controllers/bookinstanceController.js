const asyncHandler = require("express-async-handler");
const { DateTime } = require("luxon");

const connectionString = process.env.DB_CONNECTION_STRING;
const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString,
});

// Count all BookInstances.
exports.bookinstance_count = asyncHandler(async (req, res, next) => {
  try {
    const bookinstanceCount = await pool.query('SELECT count(*) FROM booksinstances');
    console.log("query for book count", bookinstanceCount.rows[0].count)
    return bookinstanceCount.rows[0].count;
  } catch (error) {
    console.log(error);
  }
});

// Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  try {
    const books = await pool.query(`SELECT a.book_title,
                                           a.book_summary,
                                           a.book_imprint,
                                           a.due_back,
                                           a.book_status
                                      FROM booksinstances a
                                  ORDER BY a.book_title ASC`);

    // format date
    for (const book of books.rows) {
      book.due_back = DateTime.fromJSDate(book.due_back).toLocaleString(DateTime.DATE_MED)
    }
    
    res.render("bookinstance_list", {
      title: "Book Instance List",
      booksinstance_list: books.rows
    });
  } catch (error) {
    console.log(error);
  }
});

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
});

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
