var mongoose = require("mongoose");
var Activities = require("../models/activities");
var activityRecords = require("../models/activityRecords");
var Location = require("../models/location");
var Employee = require("../models/employees");

exports.getIndex = (req, res, next) => {
        res.render('orghead/index', {
          pageTitle: 'orghead Head Dashboard',
          x:5,
          path: '/orghead/index',
         
        });
  };

  exports.getviewData = (req, res, next) => {
          res.render('orghead/viewData', {
            pageTitle: 'orghead Head Dashboard',
          });
    };

    exports.getmanageData = (req, res, next) => {
      Promise.all([
        Activities.find({},'_id activityName'),
        Location.find({})
       ])
       .then( ([ Activities,Location]) => {
        res.render("orghead/manageData", 
        {
          activities : Activities ,
          cities : Location,
          pageTitle: 'manage data'
        });
      })
      .catch(err => {
     //console.log(err);
      });
      };

      exports.getProductivity = (req, res, next) => {
      Promise.all([
        Activities.find({},'_id activityName'),
        Location.find({})
       ])
       .then( ([ Activities,Location]) => {
        res.render("orghead/productivity", 
        {
          activities : Activities ,
          cities : Location,
          pageTitle: 'manage data'
        });
      })
      .catch(err => {
     //console.log(err);
      });

        // activityRecords.find({"created_on": {"$gte": '2019-02-10T00:00:00.000+00:00', "$lt": '2019-02-13T00:00:00.000+00:00'}}, function (err, docs) {
        //   res.render('orghead/productivity',{
        //        data : docs
        //   });
        // })
        // .populate('activityType')
         };
  

      //AJAX REQUEST

      exports.ajaxApplyFilter = (req, res, next) => {
       
        filterActivity = req.body.activities;
        filterLocation = req.body.locations;
        filterDate = req.body.date;
        if(filterLocation.length > 0)
          reqData={activityType : filterActivity , location : filterLocation};
          else
          reqData={activityType : filterActivity};
       // reqData={time : {"$gte": filterDate[0], "$lt": filterDate[1]}};
     //console.log(reqData);
        activityRecords.find(reqData).sort({'time' : 'desc'})
        .populate({ path: 'activityType', select: 'activityName' })
        .populate({ path: 'location', select: 'city' })
        .populate({ path: 'submittedBy', select: 'username' })
        .exec((err, activityData) => {
          if (err) {
         //console.log("Error:", err);
          }
          else {
           res.json(activityData);
        //console.log(activityData);
          }
        });

      };

      exports.ajaxAddCity = (req, res, next) => {
        var city = new Location({
          city : req.body.cityName
        });
        city.save(function(err) {
          if(err) {
         //console.log(err);
            res.status(500).json({msg:'fail'});
          } else {
            res.status(200).json({msg:'Success'});
          }
        });

      };

      exports.ajaxUpdateCity = (req, res, next) => {
        const id = req.body.id;
        const cityName = req.body.city;
        Location.findById(id)
        .then(city => {
          if(!city){
            return next(new Error('City not found'));
          }
          return Location.updateOne({_id:id ,city : cityName});
        })
        .then(()=>{
       //console.log('City Updated');
          res.status(200).json({msg:'city updated'});
        })
        .catch(err =>{
          res.status(500).json({msg:'failed to update'})
        })

      };

      // exports.ajaxDeleteCity = (req, res, next) => {
      //   const id = req.params.id;
      //   Location.findById(id)
      //   .then(city => {
      //     if(!city){
      //       return next(new Error('City not found'));
      //     }
      //     return Location.deleteOne({_id : id});
      //   })
      //   .then(()=>{
      //  //console.log('City Deleted');
      //     res.status(200).json({msg:'city deleted'});
      //   })
      //   .catch(err =>{
      //     res.status(500).json({msg:'failed to delete'})
      //   })

      // };
  
  