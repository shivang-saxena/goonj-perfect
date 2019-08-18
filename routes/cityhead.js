const path = require('path');

const express = require('express');

const cityheadController = require('../controllers/cityhead');
//const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /dephead/add-product => GET
router.get('/index',cityheadController.getIndex);
router.get('/addActivity',cityheadController.getAddActivity);
router.get('/viewActivity',cityheadController.getViewActivity);
router.get('/addField',cityheadController.getaddField);
router.get('/productivity',cityheadController.getProductivity);

router.post('/addActivity',cityheadController.postAddActivity);
router.post('/viewActivity',cityheadController.postViewActivity);
router.post('/addField',cityheadController.postaddstatesField);
router.post('/applyFilter',cityheadController.applyFilter);
module.exports = router;
