var aws = require('aws-sdk');
var crypto = require("crypto");
var path = require("path");

var BUCKET = 'jafid';
var BASE_AMAZON = "http://s3.amazonaws.com/"+BUCKET+"/";

aws.config.update({
    accessKeyId: "AKIAJYUGIBK2XEQQ5PGA",
    secretAccessKey: "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"
});

aws.config.update({region: 'us-west-2'});

var s3 = new aws.S3();

module.exports = {
	uploadToS3 : function(buffer, filename, callback){
            
            var _key = filename;
		    var data = {
		    	Bucket: BUCKET,
			    Key: _key, 
			    Body: buffer
	  		};

			s3.putObject(data, function(err, data){
				console.log("putobject", data);
				if(err){
					callback(err, null);
				}else{
					var URL = BASE_AMAZON  + _key;
					callback(null, {url : URL});
				}
			});
	}
}