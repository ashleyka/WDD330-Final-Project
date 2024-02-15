//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res){

  let today = new Date();
  let currentDay = today.detDay();
  let day ="";

  if (currentDay === 6  || currentDay === 0 ){
    day = "weekend";

    req.render("list")
  }else {

    day = "weekday";

    res.sendFile(_driname + "/weekday.html");
  }


});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("src"));


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
