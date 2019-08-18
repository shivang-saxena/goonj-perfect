
var Activities = require("../models/activities");
var activityRecords = require("../models/activityRecords");
var Employee = require("../models/employees");
var Location = require("../models/location");
var Efficiency = require("../models/efficiency");
var TotalEfficiency = require("../models/totalefficiency");



  exports.getAddActivity = function (req, res, next) {
    
    Promise.all([
      Activities.find({},'_id activityName'),
      Location.find({}),
      Employee.find({},'_id name id'),
      Efficiency.find({"created_at" : { 
        $lt: new Date(),
        $gte:   new Date(new Date().setHours(00,00,00))
        
      }  })
  .populate({ path: 'activityType', select: 'activityName' })
  .populate({ path: 'location', select: 'city' })
  .populate({ path: 'submittedBy', select: 'username' }),
     ])
     .then( ([ Activities,Location, Employee,activityRecords]) => {
       
       
      res.render("dephead/addActivity", 
      {
        activities : Activities ,
        activityRecords:activityRecords,
        cities : Location,
        employees : Employee,
        date : new Date(),
        pageTitle: 'Add new Activity'
      });
    })
    .catch(err => {
   //console.log(err);
    });
};
exports.getViewActivity = (req, res, next) => {
  const username = req.session.user.name;
  console.log(username);

  var e=[];

  Promise.all([
    Efficiency.find({},'_id activityName')
.populate({ path: 'activityType', select: 'activityName' })
.populate({ path: 'location', select: 'city' })
.populate({ path: 'submittedBy', select: 'username' }),

Efficiency
.aggregate([     { "$unwind": "$activityType" },

{ $group: {
  _id:"$activityType",
  
  manhours:       { $sum: "$timeTaken" },
  products:       { $sum: "$productseach" }
  
}}
])
   ])
   .then( ([ activitydata,eff]) => {
    eff.forEach(a => {
      e.push(a.products/ a.manhours);
    })
  
    res.render("dephead/viewActivity",
    {
      activitydata:activitydata,
      data : eff,
      e:e,         
      pageTitle: 'Employee Data'});
 });
    



//  Efficiency
//     .aggregate([     { "$unwind": "$activityType" },
    
//     { $group: {
//       _id:"$activityType",
      
//       manhours:       { $sum: "$timeTaken" },
//       products:       { $sum: "$productseach" }
      
//   }}
//   ]
  
//   ,function (err, x) {
//         if (err) {
//          //console.log(err);
//             return;
//         }
        
//         x.forEach(a => {
//         e.push(a.products/ a.manhours);

         
        
//      //console.log(e);
        
//     })
//   })
//     .exec((err, eff) => {
//       if (err) {
//      //console.log("Error:", err);
//       }
//       else {
        
        
       
//         res.render("dephead/viewActivity",
//          {
//            data : eff,
//            e:e,  
//           //  x:x,        
//            pageTitle: 'Employee Data'});
//       }
//     });
  


// console.log(x );
//   Efficiency.aggregate([{ $match : { activityType : "5c7599603fcfb01bd0b4749b," } } ]
//   , function (err, result) {
//     if (err) {
//      //console.log(err);
//         return;
//     }
//  //console.log(result);
// });


  // Efficiency.find({})
  // .populate({ path: 'activityType', select: 'activityName' })
  // .populate({ path: 'submittedBy', select: 'name' })
  // .exec((err, employeeData) => {
  //   if (err) {
  //  //console.log("Error:", err);
  //   }
  //   else {
  //     res.render("dephead/viewActivity",
  //      {
  //        data : employeeData,
        
  //        pageTitle: 'Employee Data'});
  //   }
  // });






  // activityRecords.find({submittedBy:req.session.user._id})
  // .populate({ path: 'activityType', select: 'activityName' }
  // .populate({ path: 'location', select: 'city' })
  // .populate({ path: 'submittedBy', select: 'username' })
  // .exec((err, activityData) => {
  //   if (err) {
  //  //console.log("Error:", err);
  //   }

  //   else {
  //     // console.log(activityData);
  //     res.render("dephead/viewActivity",
  //      {
  //        data : activityData,
  //        username:username,
  //        pageTitle: 'View Activity'});
  //   }
  // });
}

exports.getViewEmployee = (req, res, next) => {
    
  Employee.find({})
  .populate({ path: 'activityType', select: 'activityName' })
  .populate({ path: 'location', select: 'city' })
  .populate({ path: 'submittedBy', select: 'name' })
  .exec((err, employeeData) => {
    if (err) {
   //console.log("Error:", err);
    }
    else {
      res.render("dephead/viewEmployee",
       {
         data : employeeData,
         pageTitle: 'Employee Data'});
    }
  });
}





exports.postAddActivity = (req, res, next) => {

  
  
  var efficiency = new Efficiency({
    empId: req.body.workers,
    activityType: req.body.activityType,
    timeTaken: req.body.workinghour,
    location:req.session.user.city,
    submittedBy: req.session.user._id,
    productseach:req.body.productsMade
  });

    efficiency.save(function(err) {
    if(err) {
   //console.log(err);
      res.render("dephead/addActivity");
    } else {
      res.redirect("/dephead/addActivity");
    }
  });

};

exports.postViewActivity = (req, res, next) => {
  
  const username = req.session.user.name;
  
  
  
  // Efficiency
  //   .aggregate([ 
    
  //   { $group: {
  //     _id:"$activityType",
      
  //     manhours:       { $sum: "$timeTaken" },
  //     products:       { $sum: "$productseach" }
      
  // }}
  // ],
  // (err, employeeData) => {
  //   if (err) {
  //  //console.log("Error:", err);
  //   }
  //   else {
  //  //console.log(employeeData.manhours);
  //     res.render("dephead/viewActivity",
  //      {
  //        data : employeeData,
        
  //        pageTitle: 'Employee Data'});
  //   }
  // }
  // // function(err,result){
  //   if(err){
  //  //console.log(err);
  //     return;

  //   }
  //   console.log(result.manhours)
  //   var acr = new TotalEfficiency({
      
  //     activityType: req.body.activityType,
      
  //     onedaymanpower: result.manhours,
  //     onedayproductsMade: result.products
  //   });
  
  //     acr.save(function(err) {
  //     if(err) {
  //    //console.log(err);
  //       res.render("dephead/viewActivity");
  //     } else {
  //       res.redirect("/dephead/viewActivity");
  //     }
  //   })
  // }


  
// );



//     var tp=0;
//     var tt=0;

// activityRecords.find({})
// .populate({ path: 'activityType', select: 'activityName' })
//   .populate({ path: 'submittedBy', select: 'name' })

  Efficiency.find({activityType:"5c7597673fcfb01bd0b47493"})
  .populate({ path: 'activityType', select: 'activityName' })
  .populate({ path: 'submittedBy', select: 'name' })
  .exec((err, arr) => {
    if (err) {
   //console.log("Error:", err);
    }
    else {
   //console.log(arr);
      res.render("dephead/viewActivity",
      {
       data:arr,
       
        pageTitle: 'Employee Data'});
    }
   
  });
 






    
  
};

exports.postAddEmployee = (req, res, next) =>  {
  console.log(req.body);
  var employee = new Employee({
    id : req.body.employeeid,
    name : req.body.employeename,
    phone : req.body.employeephone,
    location : req.session.user.city
  });
  employee.save(function(err) {
    if(err) {
   //console.log(err);
      res.status(500).json({msg:'fail'});
    } else {
      res.status(200).json({msg:'Success'});
    }
  });

  };

  exports.ajaxGetEmployeeID = (req, res, next) =>  {
    Employee.findOne({},'id').sort('-created_at').exec(function(err, record) { 
      if (err) {
     //console.log("Error:", err);
      }
  
      else {
        res.status(200).json({id:record});
      }
    });

    };

exports.getManhour = (req, res, next) =>  {
  console.log(req.session.user);
        res.render('dephead/addmanhour', {
          pageTitle: 'Department Head Dashboard',
          path: '/dephead/addmanhour',
          username:'',
        });
  };


  exports.postAddGroupData = (req, res, next) => {
    
    var efficiency = new Efficiency({
    empId: req.body.workers,
    activityType: req.body.activityType,
    timeTaken: req.body.workinghour,
    submittedBy: req.session.user._id,
    productseach:req.body.productsMade,
    no:req.body.no,
  });

    efficiency.save(function(err) {
    if(err) {
   //console.log(err);
      res.render("dephead/addActivity");
    } else {
      res.redirect("/dephead/addActivity");
    }
  });
  
  }

  exports.postAddGroupProducts= (req, res, next) => {
    
    const id = req.body.groupactivity._id;
 //console.log(id);
        const groupproduct = req.body.groupproduct;
        Efficiency.findById(id)
        .then(groupact => {
          if(!groupact){
            return next(new Error('City not found'));
          }
          return Efficiency.updateOne({activityType :id ,productseach : groupproduct});
        })
        .then(()=>{
       //console.log('Group Products added');
          res.render("dephead/addActivity", 
      {
        activities : Activities ,
        activityRecords:activityRecords,
        employees : Employee,
        date : new Date(),
        pageTitle: 'Add new Activity'
      });
        })
        .catch(err =>{
          res.status(500).json({msg:'failed to update'})
        })

  }