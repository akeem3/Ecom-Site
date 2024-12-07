const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Create an express app
const app = express();

// Enable CORS
app.use(cors());

// Enable parsing of JSON in the body of the request
app.use(express.json());

// Connect to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass123",
  database: "products",
});

// Create a route that returns the details of all products in the table
app.get("/", (req, res) => {
  res.json("hello this is the backend!");
});

app.get("/products", (req, res) => {
  const q = "SELECT * FROM products_CSV";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/products/search", (req, res) => {
  const name = req.query.name;
  const q = `SELECT * FROM products_CSV WHERE name LIKE '%${name}%'`;
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Start the server on port 5000
app.listen(4000, function () {
  console.log("Your API is listening on port 5000");
});
