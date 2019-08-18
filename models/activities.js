const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    tempId: { type: String,required: true },
   activityName :{type : String , required : true},
   description :{type : String , required : true},
},
{ timestamps: { createdAt: 'created_at' }
   });

module.exports = mongoose.model('Activities', departmentSchema);
