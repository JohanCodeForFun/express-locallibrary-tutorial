// test for api routes
const bookController = require("../controllers/bookController");

const { test, expect } = require("mocha");
const sinon = require("sinon");
const request = require("supertest");

describe.only("Book Controller Tests:", () => {

  test("Get books", async () => {
    
    bookController.book_list = sinon.stub().returns(200);

  });

  // test("Get books by id", async () => {
  //   const response = await request(app).get("/api/books/1");
  //   expect(response.statusCode).toBe(200);
  // });

  test("Create book", async () => {

    const req = {
      "book_title": "The newest newsest Express book!",
      "book_summary": "There is no shortcut to success.",
      "book_isbn": "1234567890123"
};
    const res = {
      status: sinon.spy(),
      send: sinon.spy(),
      json: sinon.spy()
    };
    
    bookController.book_create_post(req, res);
    
    res.status.calledWith(201);
    res.send.calledWith("Book Created");
    // console.log("res.status", res.status);
  });
});