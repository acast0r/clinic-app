const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/User');
const session = require('express-session');


app.use(session({
    secret: 'panda',
    resave: false,
    saveUninitialized: true
  }))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    next();
})




app.use('/user', userRouter);


mongoose.connect('mongodb+srv://telus:telus123@clinic-app.lpyot.mongodb.net/clinic-app_db?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Database connected.')
});


app.listen(5000, () => {
    console.log('Server running on port 5000.')
});