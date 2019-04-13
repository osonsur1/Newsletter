//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/11eb6d99d3",
    method: "POST",
    headers: {
      "Authorization": "omkar1 60fb0aeb363d3cd59f7ec49ebb368e0b-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });


});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT ||3000, function() {
  console.log("Server is running on port 3000");
});

//API Key
//60fb0aeb363d3cd59f7ec49ebb368e0b-us20

//List ID
//11eb6d99d3
