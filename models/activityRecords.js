    const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var Activities = require("../models/activities");
var activityRecords = require("../models/activityRecords");
var Employee = require("../models/employees");
var Location = require("../models/location");



const activitySchema = new Schema({
    activityType: {type: Schema.Types.ObjectId,ref : 'Activities'},
    manpower: {type: Number , required: true},
    productsMade: {type: Number , required: true},
    location : {type: Schema.Types.ObjectId,ref : 'Location'},
    submittedBy : {type: Schema.Types.ObjectId,ref : 'User'},
    workerefficiency : { type :Number , default : 0},
    productefficiency : {type :Number, default : 0}
     },

    { timestamps: { createdAt: 'created_at' }

    

   });

  
  

// activitySchema.pre('save', function(next) {
// // get the current date
// var currentDate = new Date();
// console.log("aaj");
// console.log(currentDate.toDateString());
// console.log("pichli baar  ");

// console.log(this.time.toDateString());
// // change the updated_at field to current date
// // this.updated_at = currentDate;
// if(currentDate ===  this.time){
//  this.toBeUpdated= false;
//  console.log(this.toBeUpdated + "activity will not be updates");
// }else{
//  //console.log(this.toBeUpdated + "updated");
// }
// next();
// });

  
activitySchema.pre('save', function(next) {
    // get the current date

    
 //console.log(this.time.toDateString());
    // change the updated_at field to current date
    // this.updated_at = currentDate;
    if(currentDate.toDateString() ===  this.time.toDateString()){
     this.toBeUpdated= false;
    
    
  //console.log(this.toBeUpdated + "Today's activity already updated ");

     res.send("dephead/addActivity");
    }else{
     //console.log(this.toBeUpdated + "updated");
        next();
    }
    
    });

    //method for WE and TE calculation

    activitySchema.methods.efficiency = function efficiency (products,manpower) {
        this.workerefficiency = ( products/ manpower );
        this.productefficiency = ( products/ manpower );
        // return this.model('Animal').find({ type: this.type }, cb);
      };

module.exports = mongoose.model('activityRecords', activitySchema);
