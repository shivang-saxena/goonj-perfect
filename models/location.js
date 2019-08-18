 const mongoose = require('mongoose');

  const Schema = mongoose.Schema;
  

const locationSchema = new Schema({
    city : {
      type: String, unique: true, required: true, lowercase: true ,trim:true
    },
    cityactivities:[{type: Schema.Types.ObjectId,ref : 'Activities'}],
    offices:[]      
  },
  { timestamps: { createdAt: 'created_at' }
});
  
  module.exports = mongoose.model('Location', locationSchema);