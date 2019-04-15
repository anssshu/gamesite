//create the model for user signup and login
//import modules
var mongoose=require("mongoose");

//create a schema
var Schema = mongoose.Schema;

//create the Users Schema for lookup during login 
//stores confidential data

var UsersSchema= new Schema({
            username:String,
            password:String,
            ip:String,
            dateTime:String
        });


//create a Person schema for  Sign Up process

var PersonsSchema = new Schema({
        username:String,
        prifile_pic:String,
        signup:{
            firstname:String,
            lastname:String,
            email:String,
            mobileno:String
        },
        address:{
            street:String,
            landmark:String,
            city:String,
            country:String,
            postalcode:String
            },
        location:{
            lat:String,
            long:String
        },
        extra:[]
    });

//create the model and export them
module.exports={
 Users:function(con){return con.model("UsersModel",UsersSchema,"users");},
 Persons:function(con){return con.model("PersonsModel",PersonsSchema,"persons");}    
    }
