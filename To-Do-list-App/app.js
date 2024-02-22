//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = []; 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("src"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res) {
  let item = req.body.NewItem;

  items.push(item);

  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list",{listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res) {
  let item = req.body.NewItem;

  workItems.push(item);

  res.redirect("/work");
});


app.get("/books", function(req, res) {
  res.render("bookSearch");
});


app.post("/books", function(req, res) {
  const searchTerm = req.body.searchTerm;

  
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then(response => {
      const books = response.data.items;
      res.render("bookResults", { books: books });
    })
    .catch(error => {
      console.error("Error fetching book data:", error);
      res.render("error", { message: "Failed to fetch book data. Please try again later." });
    });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
