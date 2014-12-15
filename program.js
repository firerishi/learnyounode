// lesson #10
// TIME SERVER

var net = require('net')

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  var d = new Date()
  return d.getFullYear() + '-'
    + zeroFill(d.getMonth() + 1) + '-'
    + zeroFill(d.getDate()) + ' '
    + zeroFill(d.getHours()) + ':'
    + zeroFill(d.getMinutes())
}

var server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))


// lesson #9

var http = require('http'),
	bl = require('bl'),
	urls = [
		process.argv[2],
		process.argv[3],
		process.argv[4]
	],
	urlContent = [],
	count = 0;

urls.forEach(function(url, index){
	http.get(url, function(res) {
		res.pipe(bl(function(err,data){

			if (err) {
				return console.error(err);
			}

			urlContent[index] = data.toString();

			count++;

			if (count === 3) {
				printResult();
			}
		}));
	});	
});

function printResult() {
	urlContent.forEach(function(val, index) {
		console.log(val);
	});
}


// lesson #8

var http = require('http'),
	bl = require('bl'),
	url = process.argv[2];

http.get(url, function(res) {
	res.pipe(bl(function(err,data){

		if (err) {
			return console.error(err);
		}

		console.log(data.length);
		console.log(data.toString());
	}));
});


// lesson #7

var http = require('http'),
	url = process.argv[2];

http.get(url, function(res) {
	res.setEncoding('utf8');
	res.on('data', function(data) {
		console.log(data)
	});
	res.on('error', console.error);
});


// lesson #6

var mod = require('./mymodule'),
	dir = process.argv[2],
	ext = process.argv[3];

mod(dir, ext, function(err, files){
	if (err) {
		console.log('something errored out ', err);
	}

	files.forEach(function(file) {
		console.log(file);
	})
	
})


// lesson #5

var fs = require('fs'),
	path = require('path'),
	dir = process.argv[2],
	ext = process.argv[3];

fs.readdir(dir, function(err, files) {
	for (var i=0; i< files.length; i++) {
		fileExt = path.extname(files[i]).split('.');
		fileExt = fileExt[1];
		if (fileExt === ext.toString()) {
			console.log(files[i]);
		}
	}
})

// lesson #4

var fs = require('fs'),
    buf;

fs.readFile(process.argv[2], 'utf8', function(err, data) {
	console.log(data.split('\n').length - 1);
})


// lesson #3

var fs = require('fs'),
    buf = fs.readFileSync(process.argv[2]),
    arr = buf.toString().split('\n'),
    countNewLine = arr.length;

console.log(countNewLine - 1);


// lesson #2
var count, 
	sum = 0;

for (count = 2; count < process.argv.length; count++) {
	sum += +process.argv[count];
}

console.log(sum);


// lesson #1

console.log('HEllO WORLD');