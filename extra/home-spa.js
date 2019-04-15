//code for the home-spa.js file it interacts with the ng-home-spa
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

//create a connection
//var con = mongoose.createConnection("mongodb://localhost/test");
var con = mongoose.createConnection("mongodb://fukan:barsha75@ds259111.mlab.com:59111/mydb");


//import models
var loginModel = require("../models/userModel");

//get the Persons Model and User Model
var Persons = loginModel.Persons(con);
var Users = loginModel.Users(con);
//dummy username and password for testing
var user="",
    pass="";  
//----------------------------------home page---------------------------------------------
//home page for the SPA
router.get('/', function(req, res, next) {
    // console.log(req.session_state);	 
    //res.send("from index.js\n");
    if (req.session_state.remember) res.redirect("/profile");
    else res.sendfile('./ng-views/ng-home-spa.html');
    
});

//----------------------------------login post----------------------------------------------
//LogIn from the home-spa will post to here
router.post("/",function(req,res,next){
	console.log(req.body);
	//get the username and password and set them to user and pass
    Users.find({username:req.body.username},function(err,docs){
                if (docs.length !=0) {
                    user = docs[0].username;
                    pass = docs[0].password;
                    console.log(user == req.body.username,pass)
            
                
                    //validate it from the data base
		
			
	               //if validation ok redirect to profile spa
		              if (user == req.body.username && pass == req.body.password)
                            {
				                console.log("pass");
				                //create a session
				                req.session_state.username=req.body.username;
                                //if remember check-box is ticked
                                req.session_state.remember=req.body.remember;
				                console.log(req.session_state,req.body.remember)
				               // res.redirect("/profile");
                                 res.send("success");
				            }
	                   //if validation incorrect send error message
		              else res.send(" invalid username or password ");

                
                
                
                }//END OF IF FOR DOCS.LENGTH!=0 
            else//if user does not exist
                res.send("user does not exist");
    });
	
});
//------------------------------------sign up post data------------------------------------
//code for the signup process from home-spa
router.post("/signup",function(req,res,next){
        console.log(req.body);
		//get the posted data
		
		//check if the user already exist or not
            Users.find({username:req.body.username},function(err,docs){
                    //if user does not exist then save the user	
                    if (docs.length == 0) {
                        console.log("new user")
                        //create a new user
                        var u = new Users();
                        u.username = req.body.username;
                        u.password=req.body.password;
                        u.ip=req.connection.remoteAddress || "not found";
                        u.dateTime=new Date().toString();
                        //save it 
                        u.save()
                        //create a new person 
                        var p = new Persons();
                        p.username=req.body.username;
                        p.signup={
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            email:req.body.email,
                            mobileno:req.body.mobileno
                        }
                        p.extra=[];
                        //save it
                        p.save();
                        console.log(p,u,"new user saved");
                        //redirect to login page and send success message
                        res.redirect("/#/login");
                        //res.send("success");
                    }
                //if (docs.length !=0) res.send("user exist");
                //if user exist then send the error message 
                 else // send error message
                        //res.send("username already exist");
                     res.redirect("/#/signup");
                });
		

		//after user registration validate their email or phone number and activate their accoounts

		//	
		
	});

//-------------------------------------usename check during signup----------------------------
//signup helper for checking username exists or not async 
router.get("/signupHelper",function(req,res,next){
    Users.find({username:req.query.username},function(err,docs){
        console.log(req.query.username.toString());
        if (req.query.username =="" || req.query.username.toString() == "undefined") res.send('');
        else if (docs.length == 0 && req.query.username !='') res.send("username available");
            else res.send("username already exist");
    });
});
//-------------------------------------------forget password----------------------------------
//forgotPassword
router.get("/forgotPassword",function(req,res,next){
   // console.log(req.query.username);
    Users.find({username:req.query.username},function(err,docs){
            if (docs.length !=0){
            
            console.log(docs[0].password);
            //send the password to the mail address  
                /*
                
                email sending to the usrename to be coded here 
                after having a valid email service with my site
                
                */
            }
    });
    res.redirect("/");
});
//-----------------------------------------------------------------------------------------------
module.exports = router;
