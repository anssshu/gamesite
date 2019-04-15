//create a data model for the UsersSchema

var mongoose = require("mongoose");



//craete a schema

var Schema = mongoose.Schema;

//create a user Schema
var UsersSchema = new Schema({
  username:String,
  password:String,
  firstname:String,
  lastname:String,
  email:String,
  mobileno:String,
  favourites:[String],
  lastplayed:[String]
});

//create a model and export it

module.exports ={
  Users:function(con){
    return con.model("UsersModel",UsersSchema,"users");
  }
}
