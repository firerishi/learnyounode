module.exports = function(dir, ext, cb) {

	var fs = require('fs'),
		path = require('path'),
		filteredFiles = [];

	fs.readdir(dir, function(err, files) {

		if (err) {
			return cb(err);
		}

		files.forEach(function(file) {
			fileExt = path.extname(file).split('.');
			fileExt = fileExt[1];
			if (fileExt === ext.toString()) {
				filteredFiles.push(file);
			}
		})

		cb(null, filteredFiles);
	})

}