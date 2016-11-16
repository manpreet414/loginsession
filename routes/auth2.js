// var passport = require('passport');
// var Strategy = require('passport-local').Strategy;


// passport.serializeUser(function(user, cb) {
//     console.log("-----sirialize this----",user);
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//     console.log("----deserializeUser-----");
//   db.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });



// passport.use(new Strategy(
//   function(username, password, cb) {
//     db.find(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user[0].password != password) { return cb(null, false); }
//       return cb(null, user[0]);
//     });
//   }));