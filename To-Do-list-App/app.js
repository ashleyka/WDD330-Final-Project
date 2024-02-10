

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.use('view engine', 'ejs');

app.use(bodyParser.urlencoded ({extended: true}));
app.use(express.static("src"))

app.get("/", function(req, res){

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

   let day = today.toLocaleDateString("en-us", options);
   
   res.render("list",{kindofDay: day, newListItems: items});
  
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});
