const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const User = require('../models/user');
var Location = require("../models/location");

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  Location.find({},'_id city').exec((err, activityData) => {
    if(err){
 //console.log(err);
    }
    else
    {
      res.render('auth/signup', {
        cities : activityData,
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
      });
    }
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ 'contact.email': email })
  .populate('city')
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            if(user.role === 1){
              return req.session.save(err => {
            //console.log(err);
               res.redirect('orghead/index');
               
             });
            }
            else if(user.role === 2){
              return req.session.save(err => {
            //console.log(err);
              res.redirect('cityhead/index');
              });
            }
            else{
              return req.session.save(err => {
            //console.log(err);
              res.redirect('dephead/addActivity');
              });
            }
          }
            
            
          
          req.flash('error', 'Invalid email or password.');
          res.redirect('/');
        })
        .catch(err => {
       //console.log(err);
          res.redirect('/');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  console.log(req.body);
   const email = req.body.email;
   const username = req.body.username;
   const phoneno = req.body.phoneno;
   const role = req.body.role;
   const password = req.body.password;
   const location = req.body.location;
   const address = req.body.address;

  
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: req.body.name,
            password: hashedPassword,
            contact:{
              email: email,
              phoneno : phoneno,
              address: address
            },
            city : location,
            role : role ,
            username : username,
            active_status : true,
            userHead : {} 
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/');
        })
        .catch(err => {
       //console.log(err);
        });
    })
    .catch(err => {
   //console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  console.log('logout');
    req.session.destroy(err => {
   //console.log(err);
      res.redirect('/');
    });
  };
  