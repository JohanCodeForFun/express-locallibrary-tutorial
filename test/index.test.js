const index = require("../app");

const { test, expect } = require("mocha");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

describe("testing index routes", () => {
  test("index route works", done => {
    request(app)
      .get("/")
      .expect(200, done);
  });

  test('expect title for home page', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(/<title>Local Library<\/title>/)
      .expect(200, done)
  });

  test('expect link to books page', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(/<a href="\/books">Books<\/a>/)
      .expect(200, done)
  });

  test('expect page to include author', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(/Johan Hellberg/)
      .expect(200, done)
  });
  
});
