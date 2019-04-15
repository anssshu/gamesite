var express = require('express');
var router = express.Router();
var games = require("../../../models/apps/games/games");
/* GET home page. */
//one get request is sufficient as all the pages are  delivered at once
router.get('/', function(req, res, next) {
  //ensure that the user is logged in
  if (req.session_state.username)
    res.render("apps/ng-success/index.html")
  //otherwise redirect to the home page
  else {
      res.redirect("/")
    }
});


//serve the success game page info dynamically
router.get("/serve_page",function(req,res,next){
  //stores all page data
/*
  var pages = {
    newgames:["nino","type"],
    allgames:["nino","type","snake"],
    topten:["nino","bee"],
    platformers:["nino"]
  }*/
  //pages = games.pages;
  //stores all game data

  var page = req.query.page || "newgames";
  var cat = req.query.cat || "platformers"
  var gameList = JSON.stringify(games.pages[page]);
  //console.log(gameList);
  res.send(gameList);
});
//----------------

//serve the catagories game info dynamically
//serve the success game page info dynamically
router.get("/serve_cat",function(req,res,next){
  //stores all page data
/*
  var pages = {
    newgames:["nino","type"],
    allgames:["nino","type","snake"],
    topten:["nino","bee"],
    platformers:["nino"]
  }*/
  //pages = games.pages;
  //stores all game data
  var cats = {
    "platformers":["nino"],
    "action":["nino"],
    "casual":["type"]
  }

  var cat = req.query.cat || "platformers"
  var gameList = JSON.stringify({"games":games.cats[cat],"allcats":games.allcats});
  console.log(gameList);
  res.send(gameList);
});
//----------------






//request for log out
router.get('/logout', function(req, res, next) {
  req.session_state.reset();
  res.redirect("/");
});

module.exports = router;
