const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');

const signToken = userId => {
    return JWT.sign({
        iss: "telus",
        sub: userId
    }, "panda", {expiresIn: "1 day"}); // 1hr
}


/*OneLogin */

let sso = {
    isAuthenticated: false,
    user: {},
    name: null,
    token: null
}

// userRouter.get('/auth/login', passport.authenticate('openidconnect'));

userRouter.get('/auth/callback', passport.authenticate('openidconnect', {session: false}), (req, res) => {
    let {accessToken} = req.user;
    sso.isAuthenticated = true;
    sso.user = req.user;
    sso.name = req.user.name;
    sso.token = accessToken;
    res.cookie('access_token', accessToken, {httpOnly: false, sameSite: true});
    // res.status(200).json({isAuthenticated: true, user: {username: req.user.username, role: req.user.role}})
   
    res.redirect(`http://${window.location.hostname}`);
});

userRouter.get('/auth/me', (req, res) => {
    if(sso.isAuthenticated){
        // res.status(200).json({isAuthenticated: true, user: sso.user});
        // res.cookie('access_token', accessToken, {httpOnly: true, sameSite: true});
        // res.status(200).json({isAuthenticated: true, user: {username, role}})
        res.status(200).json({isAuthenticated: true, user: {username: sso.user.username, role: sso.user.role, name: sso.name}, token: sso.token});
        //  res.status(200).json({isAuthenticated: true, user: {username: req.user.username, role: req.user.role}})
    }else{
        res.status(401).json({isAuthenticated: false, user: {username: "", role: ""}})
    }
});

userRouter.get('/auth/logout', (req, res) => {
    res.clearCookie('access_token');
    sso.isAuthenticated = false;
    sso.user = {};
    sso.token = null;
    // res.status(200).json({isAuthenticated: false, user: {username: "", role: ""}})
    // res.redirect('http://localhost:3000/login');
    res.json({
        user: {username: "", role: ""}, 
        success: true
    });
});



/*OneLogin */


userRouter.post('/register', (req, res) => {
    const {username, password, role} = req.body;
    User.findOne({username}, (err, user) => {
        if(err) res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        if(user) res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});
        else {
            const newUser = new User({username, password, role});
            newUser.save(err => {
                if(err) res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                else res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
            })
        }
    })
});

userRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if(req.isAuthenticated()){
        const {_id, username, role} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username, role}})
    }
});

userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({
        user: {username: "", role: ""}, 
        success: true
    });
});

userRouter.post('/todo', passport.authenticate('jwt', {session: false}), (req, res) => {
    const todo = new Todo(req.body);
    todo.save(err => {
        if(err) res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else {
            req.user.todos.push(todo);
            req.user.save(err => {
                if(err) res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                else{
                    res.status(200).json({message: {msgBody: "Successfully created todo", msgError: false}})
                }
            })
        }
    })
});

userRouter.get('/todos', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById({_id: req.user._id}).populate('todos').exec((err, document) => {
        if(err) res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else {
            res.status(200).json({todos: document.todos, authenticated: true});
        }
    })
});

userRouter.get('/admin', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role === 'admin'){
        res.status(200).json({message: {msgBody: "You are an admin", msgError: false}})
    }else{
        res.status(403).json({message: {msgBody: "Not admin user", msgError: true}})
    }
});

userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {username, role} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username, role}})
});


module.exports = userRouter;