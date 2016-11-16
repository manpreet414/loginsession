var mongoose    = require("mongoose");
var Schema      = require("mongoose").Schema;

var UserSchema = Schema({
    username        : {type:String},
    password        : {type:String,required:true},
    first_name      : {type:String},
    last_name       : {type:String},
    created_on      : {type:Date, default: new Date()},
    email           : {type:String}
});
UserSchema.methods.toJSON =function(){
  var obj = this.toObject();
  delete obj.__v;
  return obj;
   
}

module.exports = mongoose.model('User', UserSchema);
