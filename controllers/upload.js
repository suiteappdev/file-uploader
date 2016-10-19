module.exports = function(app, apiRoutes){
    var mongoose = require('mongoose');
    var fs = require("fs");
    var path = require("path");
    var uploadModel = require('../models/upload');
    var crypto = require("crypto");
    var apiResponder = require("../helpers/api-responder.js");
    var uploader = require("../helpers/uploader/uploader.js");
    var multer = require("multer");
	var uploadMidleware = multer({ dest: 'uploads/' });

    function upload(req, res){
    	if(!req.file){
    		return res.status(500).json(apiResponder.error("NOT_FILE_PROVIDED"))
    	}

    	fs.readFile(req.file.path, function(err, buffer){
	    	uploader.uploadToS3(buffer, req.file.originalname, function(err, uploaded){
	    		if(err){
	    			return console.log(err);
	    		}
	    		
	    		var data = {};
	    		data.user_id = req.body.user_id;
	    		data.url = uploaded.url;

	    		var model = new uploadModel(data);

	    		model.save(function(err, result){
	    			if(err) {
	    				return console.log(err);
	    			}

	    			fs.unlink(req.file.path);
	    			res.status(200).json(result);
	    		});

	    	});
    	});
    }

    function getFiles(){
    	uploadModel.find({user_id:req.params.user_id, filetype:req.params.file_type}).exec(function(err, files){
    		if(err){
    			return console.log(err);
    		}

    		res.status(200).json(files);
    	});
    }

    app.post("/upload", uploadMidleware.single('file'), upload);
    app.get("/upload/:user_id/:file_type", getFiles);

    return this;
}