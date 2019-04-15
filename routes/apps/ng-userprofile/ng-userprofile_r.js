var express = require("express")
router = express.Router();
var mongoose = require("mongoose");

//import the user models
var userModel = require("../../../models/apps/ng-login/users");
//var URI = "mongodb://fukan:barsha75@ds259111.mlab.com:59111/mydb"//stores data in mlab account
var URI = "mongodb://localhost/test"

//ceate a connection to the database
var con = mongoose.createConnection(URI);
//create the user model
var Users = userModel.Users(con);



router.get("/",function(req,res,next){
  res.render("apps/ng-userprofile/index.html",{user:req.session_state.username})
});

//-----------------------------start------------------------
//read user data from the data base and show it
//settings
router.get("/user_data",function(req,res,next){
  //ensure user is logged in
  if (req.session_state.username){
      Users.find({username:req.session_state.username},function(err,docs){
        if(docs[0]){
          res.send(JSON.stringify(docs[0]));
          console.log(docs[0])
        }
        else {
          res.send("user not found")
        }
      });




  }//if user logged in


  else {
    //redirect to login pages
    res.redirect("/")
  }

})
//-----------------write a function to get and post to favourites
router.post("/settings",function(req,res,next){
  console.log(req.body);

  Users.findOne({username:req.session_state.username},function(err,doc){

    var data = req.body
    if   (data.firstname) doc.firstname = data.firstname;
    if   (data.lastname) doc.lastname = data.lastname;

    if   (data.email) doc.email = data.email;
    if   (data.mobileno) doc.mobileno = data.mobileno
    if   (data.password) doc.password=data.password

    console.log(doc);
    Users.findOneAndUpdate({username:req.session_state.username},doc,function(err,r){
      console.log(r)
      //res.redirect("/userprofile#/settings")
      res.send("success");
    });

  })
})
//----------------------------------end------------------
//-----------------write a function to get and post to playedlist
router.get("/lastplayed",function(req,res,next){
    //var
    Users.findOne({username:req.session_state.username},function(err,doc){
      console.log(doc);
      res.send(JSON.stringify(doc.lastplayed))

    });

});
//message coming from the game about page
router.post("/lastplayed",function(req,res,next){
    var name = req.body.name;
    console.log(name);
    Users.findOneAndUpdate({username:req.session_state.username},{lastplayed:[name]},function(err,resp){
      console.log(resp);
      res.redirect("/games/play?game="+name);

    });



});

//----------------------------------end------------------
/////////////////////////////////////////////////////////
router.post('/addtofavourites', function(req, res, next) {

  //if session exist and remember me is true then go to the success pages
  console.log(req.body.name)
  Users.findOne({username:req.session_state.username},function(err,user){

    var fav = user.favourites;
    var game =req.body.name;
    var i = fav.indexOf(game);
    console.log(user,fav,game,i);
    if (i == -1){//game not in fav
      fav.push(game);
      Users.findOneAndUpdate({username:req.session_state.username},{favourites:fav},function(err,r){
        console.log(r);
      });
    }
  });

  res.send("added to favourites");

});
/////////////////////remove from favourites///////////////////////////
router.post('/removefromfavourites', function(req, res, next) {

  //if session exist and remember me is true then go to the success pages
  //if session exist and remember me is true then go to the success pages
  console.log(req.body.name)
  Users.findOne({username:req.session_state.username},function(err,user){

    var fav = user.favourites;
    var game =req.body.name;
    var i = fav.indexOf(game);
    console.log(user,fav,game,i);
    if (i != -1){//game in fav
      fav.splice(i,1);//remove the game from fav
      Users.findOneAndUpdate({username:req.session_state.username},{favourites:fav},function(err,r){
        console.log(r);
      });
    }
  });

  res.send("removed from favourites");

});
//get favourite game list
router.get("/getfav",function(req,res,next){
    //var
    Users.findOne({username:req.session_state.username},function(err,doc){
      console.log(doc);
      res.send(JSON.stringify(doc.favourites))

    });

});


module.exports = router;
