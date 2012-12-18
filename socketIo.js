module.exports.listen = function(server){

	var io = require('socket.io').listen(server)
	var fs = require('fs');

	io.sockets.on('connection', function (socket) {

		console.log('Connection from user'+socket.id)

		socket.on('GetWall',function(fn){
			fs.readFile('./Game/level/wall.json', 'utf8', function (err,data) {
			  	if (err) return console.log(err);
			  	fn(JSON.parse(data))
			});
		})

	});

}