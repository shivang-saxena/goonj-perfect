
var TotalEfficiency = require("../models/totalefficiency");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const efficiencySchema = new Schema({
    empId :{type: String , required: true},
    activityType: {type: Schema.Types.ObjectId,ref : 'Activities'},
    timeTaken: {type: Number , required: true},
    location : {type: Schema.Types.ObjectId,ref : 'Location'},
    submittedBy : {type: Schema.Types.ObjectId,ref : 'User'},
    productseach : {type: Number, default:0},
    no:{type: Number, default:1}
     },
    { timestamps: { createdAt: 'created_at'}

   });

//    efficiencySchema.post("save", function () {
//     this.addManhourAndProd();
// });

// efficiencySchema.methods.addManhourAndProd = function(){
    
//   var totalefficiency = new TotalEfficiency({
//     onedaymanpower:(onedayemanpower + this.productseach ),
//     activityType: req.body.activityType,
//     onedayproductsMade: req.body.workinghour,
//     location:req.session.user.city,
//     submittedBy: req.session.user._id,
    
//   });

//   totalefficiency.save(function(err) {
//     if(err) {
//    //console.log(err);
//       res.render("dephead/addActivity");
//     } else {
//       res.redirect("/dephead/addActivity");
//     }
//   });
//   const totalProducts = req.user.username;

//   TotalEfficiency.findOneAndUpdate({activityType:this.activityType}, {$set:{totalProducts:totalProducts+ this.productseach}}, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });

// };

// TotalEfficiency.findById({activityType:this.activityType}, function(err, x) {

//     // if (err)
//     //     next();

//     x.onedaymanpower = x.onedaymanpower + this.productseach;
//     x.onedayproductsMade = x.onedayproductsMade + this.timeTaken;  // update the bears info

//     // save the bear
//     x.save();

// });


module.exports = mongoose.model('Efficiency', efficiencySchema);
