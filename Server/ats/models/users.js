/**
 * Created on: May 20, 2018
 * An object model for Users
 * Uses the model schema developed by Prakash Rai
 * Designed by Prakash Rai
 * @author Prakash Rai
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//create application schema
var userSchema = new Schema({
    username:{type : String, required : true} ,
    password:{type : String, required : true},
    firstname : {type : String},
    lastname : {type : String},
    email : {type:String, email : true}
    //createdDate : Date
});

//create model object using schema
const User = mongoose.model('User', userSchema);

//make this available to Node applications
module.exports = User;