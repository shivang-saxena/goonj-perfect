const path = require('path');

const express = require('express');

//extract the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require('body-parser');

//database
const mongoose = require('mongoose');

//Handle cookies based session
const session = require('express-session');

//Handle cookie based session server side
const MongoDBStore = require('connect-mongodb-session')(session);

//It allow to generate CSRF token for validating client side request at server side
//Its send a csrf token for every request ssend to server and server validate it and 
//identify that actual logged in user send that request
const csrf = require('csurf');

//Handles error and validation messages
const flash = require('connect-flash');

var favicon = require('serve-favicon');

const errorController = require('./controllers/error');
const User = require('./models/user');
//mongo "mongodb+srv://cluster0-x6nld.mongodb.net/test" --username shivang
//mongoexport --host Cluster0-shard-0/cluster0-shard-00-00-x6nld.mongodb.net:27017,cluster0-shard-00-01-x6nld.mongodb.net:27017,cluster0-shard-00-02-x6nld.mongodb.net:27017 --ssl --username shivang --password 7654321 --authenticationDatabase admin --db Goonj --collection locations --type json --out records.json
//'mongodb+srv://shivang:ymiBD9GNYRsbAVxJ@cluster0-x6nld.mongodb.net/Goonj?retryWrites=true';
//mongodb://localhost:27017/goonj
const MONGODB_URI =
  'mongodb+srv://shivang:7654321@cluster0-x6nld.mongodb.net/Goonj?retryWrites=true';
// const MONGODB_URI =
//   'mongodb://localhost:27017/goonj';  
const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();



app.set('view engine', 'ejs');
app.set('views', 'views');

const depheadRoutes = require('./routes/dephead');
const cityheadRoutes = require('./routes/cityhead');
const orgheadRoutes = require('./routes/orghead');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));   //Extract json data from ajax request
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  if(res.locals.isAuthenticated = req.session.isLoggedIn)
  {
  res.locals.role = req.session.user.role;
  res.locals.userinfo= {
    name : req.session.user.name,
    id : req.session.user._id,
    email : req.session.user.contact.email,
    location : req.session.user.city
  };
  }
  res.locals.csrfToken = req.csrfToken();
  
  next();
  
});



app.use('/dephead',depheadRoutes);
app.use('/cityhead',cityheadRoutes);
app.use('/orghead',orgheadRoutes);
app.use(authRoutes);

app.use(errorController.get404);



const PORT = process.env.PORT || 3000;
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(PORT);
 //console.log('connected to database');
  })
  .catch(err => {
 //console.log(err);
  });
