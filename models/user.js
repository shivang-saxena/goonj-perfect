const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String,required: true},
  username: {type: String,required: true,unique:true},
  contact: {
     phoneno : {type: String,required: true},
     address : {type: String,required: true},
     email: {type: String,required: true , unique: true}
},
  password: {
    type: String,
    required: true
  },
  city:{type: Schema.Types.ObjectId,ref : 'Location'},
  role:{ type: Number, required: true },
  userHead:{type : Object},
  activities:[{type: Schema.Types.ObjectId,ref : 'Activities'}],
  active_status:{ type: Boolean, required: true  },
  last_login: Date,
  resetToken: String,
  resetTokenExpiration: Date
},
{ timestamps: { createdAt: 'created_at' }
   });


module.exports = mongoose.model('User', userSchema);
//module.exports = mongoose.model('Employee', employeeSchema);



