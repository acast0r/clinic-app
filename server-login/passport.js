const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const OneLoginStrategy = require('passport-openidconnect').Strategy;
const User = require('./models/User');


const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"]
    }
    return token;
}

//authorizatiopn 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "panda"
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) =>{
        if(err) return done(err, false);
        if(user) return done(null, user);
        else return done(null, false);
    })
}));

//authentication using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        //something went wrong with db
        if(err) return done(err);
        //if user doesnt exist
        if(!user) return done(null, false);
        //check if password is correct
        user.comparePassword(password, done);
    })
}));

//sso
const baseUri = `https://telusinternational.onelogin.com/oidc/2`;
passport.use(new OneLoginStrategy({
    issuer: baseUri,
    clientID: '1b7d44f0-b344-0138-ab5d-0ae9a5c8ee82167174',
    clientSecret: '6c5067188da597d198d7c002d1905b900db91de7ada95677908bb9fe6eaafb6b',
    authorizationURL: `${baseUri}/auth`,
    userInfoURL: `${baseUri}/me`,
    tokenURL: `${baseUri}/token`,
    callbackURL: '/user/auth/callback',
    passReqToCallback: true
  },
  (req, issuer, userId, profile, accessToken, refreshToken, params, cb) => {

    User.findOne({username: profile._json.email}, (err, data) => {
        if(err) return cb(err);
        if(!data) return cb(null, false);

        const {_doc} = data;
        let user = {..._doc, name: profile._json.name, accessToken}
        return cb(null, user);
    })
  }));