/**
 * Created on: May 20, 2018
 * An object model for Application
 * Uses the model schema developed by Prakash Rai
 * Designed by Prakash Rai
 * @author Prakash Rai
 */
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//create application schema
var applicationSchema = new Schema({
    companyName:{type : String, required : true} ,
    city : {type : String, required : true} ,
    postWebsite : String,
    jobDescription : String,
    sourceOfJobPosting : String,
    email : {type : String, required : true} ,
    contactName : {type : String, required : true} ,
    phoneNumber : String,
    resumeVersion :{type : String, required : true} ,
    followUps : [String],
    userId : {type : String, required : true} ,
    notes : String
});

//create model object using schema
const Application = mongoose.model('Application', applicationSchema);

//make this available to Node applications
module.exports = Application;