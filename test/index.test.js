const index = require("../app");

const { test, expect } = require("mocha");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

describe("testing catalog routes", () => {
  test("index route works", done => {
    request(app)
      .get('/')
      .expect(redirect("/catalog"))
      .expect(200, done);
  });

  test('expect title for home page', done => {
    request(app)
      .get('/catalog')
      .expect('Content-Type', /text\/html;/)
      .expect(/<title>Local Library Home<\/title>/)
      .expect(200, done)
  });

  test('expect navbar with links to exist', done => {
      // write test to expect navbar to include ul element with class navbar-nav
      // write test to expect navbar to include 10 li element with class nav-item

    request(app)
      .get('/catalog')

      .expect(/<a href="\/catalog">Home<\/a>/)
      .expect(/<a href="\/catalog\/books">All Books<\/a>/)
      .expect(/<a href="\/catalog\/authors">All Authors<\/a>/)
      .expect(/<a href="\/catalog\/genres">All Genres<\/a>/)
      .expect(/<a href="\/catalog\/bookinstances">All Book Instances<\/a>/)
      .expect(/<a href="\/catalog\/book\/create">Create new author<\/a>/)
      .expect(/<a href="\/catalog\/book\/create">Create new genre<\/a>/)
      .expect(/<a href="\/catalog\/book\/create">Create new book<\/a>/)
      .expect(/<a href="\/catalog\/book\/create">Create new book instance (copy)<\/a>/)

      .expect(200, done)
  });

  test('expect page to include author', done => {
    request(app)
      .get('/catalog')
      .expect(/Johan Hellberg/)
      .expect(200, done)
  });
  
});
