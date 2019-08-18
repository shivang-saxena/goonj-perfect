const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    id :{type: String,required: true, unique:true},
    name: { type: String,required: true },
    phone : {type: Number , required : true},
    location : {type: Schema.Types.ObjectId,ref : 'Location'},
      
  },
  { timestamps: { createdAt: 'created_at' }
   });
  
  module.exports = mongoose.model('Employee', employeeSchema);