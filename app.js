const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require("dotenv");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const app = express();
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute')

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true
}).then(()=>{
  console.log("DB connected successfully");
});

//Template engine
app.set("view engine", "ejs");

//Global Variable

global.userIN = null;


//Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))
app.use(flash());
app.use((req,res,next)=>{
  res.locals.flashMessages = req.flash();
  next(); 
});
app.use(methodOverride('_method',{
  methods: ['POST', 'GET'],
}))


//Routes
app.use('*', (req, res, next)=>{
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
