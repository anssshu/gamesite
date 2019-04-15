var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
//import the user models
var userModel = require("../../../models/apps/ng-login/users");
//var URI = "mongodb://fukan:barsha75@ds259111.mlab.com:59111/mydb"//stores data in mlab account
var URI = "mongodb://localhost/test"

//ceate a connection to the database
var con = mongoose.createConnection(URI);
//create the user model
var Users = userModel.Users(con);

/* GET home page. */
//one get request is sufficient as all the pages are  delivered at once
router.get('/', function(req, res, next) {

  //if session exist and remember me is true then go to the success pages
  if (req.session_state.remember){
    res.redirect("/success");
  }

  res.render("apps/ng-login/index.html");

});
//----------------------------------------------



//interacts with the login controller
router.post('/login', function(req, res, next) {
  //console.log(req.body.username)
  //console.log(req.body.remember);
  //check the data base for the user

  Users.find({username:req.body.username},function(err,docs){
    //console.log(docs.length)
    if (docs.length !=0) {
          if (docs[0].username == req.body.username &&
              docs[0].password == req.body.password){
                //create a session
                req.session_state.username=req.body.username;
                //if remember check-box is ticked
                req.session_state.remember=req.body.remember;

                //send the success message to the client angular app

                res.send("success");
              }
          //if user name and password matches
          else {
            res.send("username and password missmatched")
          }
    }
    //if user does not exists
    else {
      res.send("user does not exist")
    };
  });


  //if(req.body.username == "fukan" && req.body.password == "babu"){
  //  res.send("success")


});
//------------------------------------------------
//signup controller and router interaction
router.post('/signup', function(req, res, next) {
  console.log(Object.keys(req.body).length);



  //check if data from all the fields are collected
  if (Object.keys(req.body).length == 6){
          var user =req.body.username;
          var pswd = req.body.password;
          var em = req.body.email ;
          var mob = req.body.mobileno;
          var fn =req.body.firstname;
          var ln = req.body.lastname;
        //  console.log((user && pswd && email && mob && firstname && lastname));
          var u = new Users()

            u.username=user;
            u.password=pswd;
            u.firstname=fn;
            u.lastname=ln;
            u.email=em;
            u.mobileno=mob;

          Users.find({username:req.body.username},function(err,docs){
              console.log(req.body.username);

           if (docs.length == 0 ) {
                u.save()
                console.log("saved")
                res.send("account created successfully goto login page");
              }
              else {
                res.send("username already taken try something else")
              }

          });

}
  //check for username ,mobileno and email in the database
  else {
    res.send("make sure no fields are left red");
  }
});
//-------------------------------------------------
//signup helper
router.get('/signupHelper', function(req, res, next) {
  //check for the username in db
  Users.find({username:req.query.username},function(err,docs){
      console.log(req.query.username.toString());
      if (req.query.username =="" || req.query.username.toString() == "undefined") res.send('');
      else if (docs.length == 0 && req.query.username !='') res.send("username available");
          else res.send("username already taken");
  });
});

///-------------forgot pasword-----------------------------------------
//forgotPassword
router.post("/forgotPassword",function(req,res,next){
   // console.log(req.query.username);
    Users.find({username:req.body.username},function(err,docs){
      //if username does not exists
      if (docs.length == 0) res.send("this  username doesnot exist ")
      else {
        var pswd = docs[0].password
        var email = docs[0].email
        //write the code to send an email to the email address


        res.send("your password has been sent to your email address ");
      }
    });

});
module.exports = router;
