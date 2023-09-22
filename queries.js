// const { Client } = require('pg');
// const pgp = require('pg-promise')();
// const db = pgp(connectionString);

const connectionString = process.env.DB_CONNECTION_STRING;
const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString,
});

const getBooks = async (req, res) => {
  try {
    console.log('getBooks');
    const books = await pool.query('SELECT * FROM book ORDER BY id ASC');
    res.status(200).json(books.rows);
  } catch (error) {
    console.log(error);
  }
}

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query('SELECT * FROM book WHERE id = $1', [id]);
    res.status(200).json(book.rows);
  } catch (error) {
    console.log(error);
  }
}

const createBook = async (req, res) => {
  try {
    const { title, genre } = req.body;
    const newBook = await pool.query('INSERT INTO book (title, genre) VALUES ($1, $2) RETURNING *', [titel, genre]);
    res.status(200).json(newBook.rows);
  } catch (error) {
    console.log(error);
  }
}

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre } = req.body;
    const updatedBook = await pool.query('UPDATE book SET title = $1, genre = $2 WHERE id = $3', [title, genre, id]);
    res.status(200).json(updatedBook.rows);
  } catch (error) {
    console.log(error);
  }
}

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await pool.query('DELETE FROM book WHERE id = $1', [id]);
    res.status(200).json(deletedBook.rows);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBooks,
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