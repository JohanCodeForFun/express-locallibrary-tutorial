const asyncHandler = require("express-async-handler");
const { DateTime } = require("luxon");

const connectionString = process.env.DB_CONNECTION_STRING;
const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString,
});

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
  try {
    const authors = await pool.query(`SELECT
                                            first_name,
                                            family_name,
                                            date_of_birth,
                                            date_of_death
                                            FROM authors ORDER BY author_id ASC`);

        // format date
        for (const author of authors.rows) {
          author.date_of_birth = DateTime.fromJSDate(author.date_of_birth).toLocaleString(DateTime.DATE_MED);
          author.date_of_death ? author.date_of_death = DateTime.fromJSDate(author.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
        }

        

    res.render("author_list", {
      title: "Author List",
      author_list: authors.rows
    });
  } catch (error) {
    console.log(error);
  }
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
});

// Display Author create form on GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
