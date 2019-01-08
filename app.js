const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
   var fName = req.body.fName;
   var lName = req.body.lName;
   var email = req.body.email;

   var data = {
       members: [
           {
               email_address: email,
               status: "subscribed",
               merge_fields: {
                   FNAME: fName,
                   LNAME: lName
               }
           }
        ]

   };

   var jsonData = JSON.stringify(data);

   var options = {
       url: "https://us7.api.mailchimp.com/3.0/lists/2cd9a9223c",
       method: "post",
       headers: {
           "Authorization": "prince 3e4a91811d96384939e4423398aed440-us7"

       },
       body: jsonData
   };

   
   request(options, function (error, response, body) {
       if (error){
           console.log(error);
           res.sendFile(__dirname + "/failure.html");
       }else{
           if (response.statusCode === 200){
               console.log(response.statusCode);
               res.sendFile(__dirname + "/success.html");
           }

       }
   })
});




app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at 3000");
});

// api key
// 3e4a91811d96384939e4423398aed440-us7

//list id
// 2cd9a9223c