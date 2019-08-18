var mongoose = require("mongoose");
var Activities = require("../models/activities");
var activityRecords = require("../models/activityRecords");
var Location = require("../models/location");
var Employee = require("../models/employees");

exports.getIndex = (req, res, next) => {
  console.log('cityhead');+
  activityRecords.find({location: req.session.city}, function (err ,result ){
 //console.log(activityRecords);
  });
        res.render('cityhead/index', {
          pageTitle: 'cityhead Head Dashboard',
          path: '/cityhead/index',
          user : req.session.user
        });
  };

  exports.getAddActivity = function (req, res, next) {
    
    Promise.all([
      Activities.find({},'_id activityName'),
      Location.find({} , '_id cityName'),
      Employee.find({},'_id name'),
     ])
     .then( ([ Activities,Location, Employee]) => {
      res.render("cityhead/addActivity", 
      {
        activities : Activities ,
        locations : Location,
        employees : Employee,
        pageTitle: 'Add new Activity'
      });
    })
    .catch(err => {
   //console.log(err);
    });
};
exports.getViewActivity = (req, res, next) => {
    
  activityRecords.find({},)
  .populate({ path: 'activityType', select: 'activityName' })
  .populate({ path: 'location', select: 'city' })
  .populate({ path: 'submittedBy', select: 'name' })
  .exec((err, activityData) => {
    if (err) {
   //console.log("Error:", err);
    }
    else {
      res.render("cityhead/viewActivity",
       {
         data : activityData,
         pageTitle: 'View Activity'
        });
    }
  });
}


exports.getProductivity = (req, res, next) => {
    
  Promise.all([
    Activities.find({},'_id activityName'),
    Location.find({} , '_id city'),
    Employee.find({},'_id name'),
   ])
   .then( ([ Activities,Location, Employee]) => {
    res.render("cityhead/productivity", 
    {
      activities : Activities ,
      cities : Location,
      employees : Employee,
      pageTitle: 'Get productivty'
    });
  })
  .catch(err => {
 //console.log(err);
  });
}

exports.getaddField = (req, res, next) => {
    
  // activityRecords.find({},'_id manpower timeTaken created_at')
//   .populate({ path: 'activityType', select: 'activityName' })
//   .populate({ path: 'location', select: 'address' })
//   .populate({ path: 'submittedBy', select: 'name' })
//   .exec((err, activityData) => {
//     if (err) {
//    //console.log("Error:", err);
//     }
//     else {
//       res.render("dephead/viewActivity",
//        {
//          data : activityData,
//          pageTitle: 'View Activity'});
//     }
//   });
res.render("cityhead/addField",
{
  // data : activityData,
  pageTitle: 'Add field'});
}


    
  
  


exports.postAddActivity = (req, res, next) => {
  var activity = new activityRecords({
    activityType: req.body.activityType,
    manpower: req.body.manpower,
    timeTaken: req.body.timeTaken,
    location : req.body.office,
    city : req.body.city,
    submittedBy : '5c72cb162407c52444ab96e5',
    employees : [req.body.worker],
    description : 'New Activity',
  });
  activity.save(function(err) {
    if(err) {
   //console.log(err);
      res.render("cityhead/addActivity");
    } else {
   //console.log("Successfully created an employee.");
      res.redirect("/cityhead/viewActivity");
    }
  });
  
};

// stateaddfield
exports.postaddstatesField = (req, res, next) => {
  var States = new states({
    country: req.body.country,
    state: req.body.state
  
    
  });
  States.save(function(err) {
    if(err) {
   //console.log(err);
      
    } else {
   //console.log("Successful.");
      // res.redirect("/dephead/viewActivity");
    }
  });
  
};

exports.applyFilter = (req, res, next) => {
 res.json({message : 'Got it'});
  
};


exports.postViewActivity = (req, res, next) => {
    
  
};