const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const bcrypt = require('bcryptjs');
const HTTP_PORT = process.env.PORT || 8080;
const https_options = {
    key: fs.readFileSync(__dirname + "/server.key"),
    cert: fs.readFileSync(__dirname + "/server.crt")
  };
const HTTPS_PORT = 4433;
app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");
app.use(express.static("public"));

app.get("/", (req, res)=>{
    var plainTextPassword = "ABC123";//this come from customer
    var hashedPassword;
    
    // Encrypt the plain text: "myPassword123"
    bcrypt.genSalt(10, function(err, salt) { 
        // Generate a "salt" using 10 rounds
        if(err){
            res.status("500").send("There was an error");
        }else{
            //we generated the salt!
            bcrypt.hash(plainTextPassword, salt, function(err, hash){
                if(err){
                    res.status("500").send("There was an error generated salt!")
                }else{
                    hashedPassword = hash;
                    //res.send(`The hashed version of: ${plainTextPassword} is ${hash}`);
                    //from here on, hashedPassword is in the database, and we just 
                    bcrypt.compare(plainTextPassword, hashedPassword).then((result)=>{
                        if(result){
                            res.render("home");
                        }else{
                            res.send("Password does not match");
                        }
                    })
                }
            });
        }
});

});

/*
app.listen(HTTP_PORT, ()=>{
    console.log("Server runing on: " + HTTP_PORT);
});
*/
http.createServer(app).listen(HTTP_PORT, ()=>{
    console.log(`Server listen on: ${HTTP_PORT}`);
});
https.createServer(https_options, app).listen(HTTPS_PORT, ()=>{
    console.log(`Sercure server listen on: ${HTTPS_PORT}`);
});
