var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var _Schema = new mongoose.Schema({
	user_id : {type:String},
	url : { type : String},
	filetype : {type :String}
});

_Schema.plugin(timestamps);

module.exports =  mongoose.model('user_media', _Schema); 