var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bcrypt = require('bcrypt-nodejs');
mongoose.connect('mongodb://localhost/test-job');
var app = express();
var db = require('./models/user.js')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1)
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: 'Its a secret.',
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(new Strategy(function(username, password, cb) {
    db.findOne({ "username": username }, function(err, user) {
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return cb(null, false);
        }
        return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
    console.log("-----sirialize--------", user.id);
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    console.log("-----deserialize-------", id);
    db.findById(id, function(err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

app.post('/signup', function(req, res) {
    console.log("inside post /signup", req.body);
    try {
        var user = req.body;
        user['email'] = user.username;
        if (!user.username) {
            res.status(400).send({ "errMessage": "Email id is required" })
            return;
        } else if (!user.password) {
            res.status(400).send({ "errMessage": "Password is required" })
            return;
        } else if (user.password != user.confirm_pw) {
            res.status(400).send({ "errMessage": "Password and confirm Password not matched" })
            return;
        } else if (!user.first_name || !user.last_name) {
            res.status(400).send({ "errMessage": "First Name and Last Name is required" })
            return;
        }
        user["password"] = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
        db.findOne({ "email": user.email }, function(err, usr) {
            if (usr) {
                res.status(400).send({ "errMessage": "Email ID already exists" });
            } else {
                db.create(user, function(err, user) {
                    console.log("user is signup", err, user);
                    if (err) {
                        return cb(err);
                    }
                    res.status(200).send({ "sucess": "User Sucessfully created" });
                });
            }
        });
    } catch (err) {
        console.log("err", err);
    }
});

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/fail',
    successRedirect: '/me'
}));

app.get('/me', function(req, res) {
    console.log("inside /me", req.user);
    res.send(req.user);
});

app.get('/fail', function(req, res) {
    console.log("inside /fail", req.user);
    res.status(400).send({ "errMessage": "Username or Password Does not matched" });
});

app.get('/logout', function(req, res) {
    console.log("insie /logout");
    req.logout();
    res.send({ "sucess": 1 })
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
