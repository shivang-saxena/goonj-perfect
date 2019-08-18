const path = require('path');

const express = require('express');

const depheadController = require('../controllers/dephead');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /dephead/add-product => GET
// router.get('/index',isAuth,depheadController.getIndex);
router.get('/addActivity',isAuth,depheadController.getAddActivity);
router.get('/viewActivity',isAuth,depheadController.getViewActivity);
router.get('/viewEmployee',isAuth,depheadController.getViewEmployee);
router.get('/addmanhour',isAuth,depheadController.getManhour);


// router.get('/allactivity',isAuth,depheadController.getAllActivity);


// /dephead/add-product => GET
router.post('/addActivity',isAuth,depheadController.postAddActivity);
router.post('/addGroupProducts',isAuth,depheadController.postAddGroupProducts);
router.post('/addGroupData',isAuth,depheadController.postAddGroupData);
router.post('/viewActivity',isAuth,depheadController.postViewActivity);


//AJAX REQUEST
router.post('/ajaxAddEmployee',isAuth,depheadController.postAddEmployee);
router.post('/ajaxGetEmployeeID',isAuth,depheadController.ajaxGetEmployeeID);

module.exports = router;
