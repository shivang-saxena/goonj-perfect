const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const totalEfficiency = new Schema({
    
    activityType: {type: Schema.Types.ObjectId,ref : 'Activities'},
    onedaymanpower: {type: Number , required: true},
    onedayproductsMade: {type: Number , required: true},
    location : {type: Schema.Types.ObjectId,ref : 'Location'},
    submittedBy : {type: Schema.Types.ObjectId,ref : 'User'},
    workerefficiency : { type :Number , default : 0},
    productefficiency : {type :Number, default : 0}
     },

    { timestamps: { createdAt: 'created_at' }

   });

   module.exports = mongoose.model('totalEfficiency', totalEfficiency);
