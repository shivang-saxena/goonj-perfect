const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// /dephead/add-product => GET
//router.get('/', authController.getIndex);

router.get('/', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.get('/logout', authController.postLogout);

module.exports = router;
