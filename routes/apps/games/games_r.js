var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

var mongoose = require("mongoose");
//import the user models
var userModel = require("../../../models/apps/ng-login/users");
//var URI = "mongodb://fukan:barsha75@ds259111.mlab.com:59111/mydb"//stores data in mlab account
var URI = "mongodb://localhost/test"

//ceate a connection to the database
var con = mongoose.createConnection(URI);
//create the user model
var Users = userModel.Users(con);


//fs reads relative to the project directory

//----------------------------------nino-----------------------------------
/* open the game description  page */
router.get('/', function(req, res, next) {
  //for protected info first check session exist or not then serve content
  //get the name of the game from query
  //console.log(req.session_state)
  var name = req.query.game || "nino";
  //var con = fs.readFileSync("public/apps/games/"+name+"/game.json");
  var game = {};//JSON.parse(con);
  game.name = name;
  game.path = "/games/play?game="+name;
  game.image = "/apps/games/"+name+"/splash.png"
  var con = fs.readFileSync("public/apps/games/"+name+"/game.txt") || " no text";
  game.text = con.toString() || "no text";

  //check if the game is in favourite list
  Users.findOne({username:req.session_state.username},function(err,doc){
    if (doc){

      var i=doc.favourites.indexOf(req.query.game)
      if (i==-1)//game not in favourites
      {
        game.fav = "like";
      }
      else{
        game.fav = "heart";
      }
      console.log(doc,game);
      res.render("apps/games/layout.html",{game:game})
    }
    else {
      res.redirect("/");//redirect to login page
    }
  });
  //console.log(game.fav);
  //console.log(game);
  //res.sendFile('index.html',{root:path.join(__dirname,"../public/games/nino")});
  //var game={name:"Nino",image:"/apps/games/nino/splash.png",path:"/games/nino/play",text:"this is my fav game"}
  //res.render("apps/games/nino.html")

});



/* serve the  games */
router.get('/play', function(req, res, next) {
  //for protected info first check session exist or not then serve content
  var name = req.query.game || "nino";

  req.session_state.game = name;

  //update game lastplayed list

  //res.sendFile('index.html',{root:path.join(__dirname,"../public/games/nino")});
  res.redirect("/apps/games/"+name+"/")
});



module.exports = router;
