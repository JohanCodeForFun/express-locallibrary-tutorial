// API for PostgreSQL database, books table

const connectionString = process.env.DB_CONNECTION_STRING;
const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString,
});

const getBooks = async (req, res) => {
  try {
    console.log('getBooks');
    const books = await pool.query('SELECT * FROM books ORDER BY book_id ASC');
    res.status(200).json(books.rows);
  } catch (error) {
    console.log(error);
  }
}

const getBooksCount = async (req, res) => {
  try {
    console.log('getBooks');
    const books = await pool.query('SELECT count(*) FROM books');
    return books.rows[0].count;
  } catch (error) {
    console.log(error);
  }
}

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query('SELECT * FROM books WHERE book_id = $1', [id]);
    res.status(200).json(book.rows);
  } catch (error) {
    console.log(error);
  }
}

const createBook = async (req, res) => {
  try {
    /* write function to insert book into database with req.body
    there are tables for books, authors, genres, and book_instances
    book_instances is a table that has a foreign key for book_id
    book_id is a foreign key for authors, genres, and book_instances
    book_instances has a foreign key for status_id
    status_id is a foreign key for status */


    const { book_title, book_summary, book_isbn } = req.body;
    const newBook = await pool.query('INSERT INTO books (book_title, book_summary, book_isbn) VALUES ($1, $2, $3) RETURNING *', [book_title, book_summary, book_isbn]);
    res.status(200).json(newBook.rows);
  } catch (error) {
    console.log(error);
  }
}

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { book_title, book_summary, book_isbn } = req.body;
    const updatedBook = await pool.query('UPDATE books SET book_title = $1, book_summary = $2, book_isbn = $3 WHERE book_id = $4', [book_title, book_summary, book_isbn, id]);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
  }
}

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await pool.query('DELETE FROM books WHERE book_id = $1', [id]);
    res.status(200).json(deletedBook.rows);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBooks,
  getBooksCount,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};


// const connectDb = async () => {
//   try {
//     const client = new Client({
//       connectionString,
//     });
//     await client.connect();
//     console.log('connected to postgresql');
//     const res = await client.query('SELECT $1::text as message', ['Hello world!']);
//   } catch (error) {
//     console.log(error);
//   }
// };

// connectDb();