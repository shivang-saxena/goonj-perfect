const path = require('path');

const express = require('express');

const orgheadController = require('../controllers/orghead');
//const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /dephead/add-product => GET
router.get('/index',orgheadController.getIndex);
router.get('/viewData',orgheadController.getviewData);
router.get('/manageData',orgheadController.getmanageData);
router.get('/productivity',orgheadController.getProductivity);

//AJAX request
router.post('/addCity',orgheadController.ajaxAddCity);
router.post('/updateCity',orgheadController.ajaxUpdateCity);
router.post('/applyFilter',orgheadController.ajaxApplyFilter);
//router.delete('/deleteCity/:id',orgheadController.ajaxDeleteCity);

module.exports = router;
