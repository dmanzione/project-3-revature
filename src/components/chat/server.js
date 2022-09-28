

//create application structure with lightweight web framework Express
const app = require('express')();

//get http module
let http = require('http');

//create server and associate said server with express app
http = http.Server(app);

//get socket.io module and tell it to put our socket at the http server's endpoint
//took me a while to figure this out but all you have to do is extend the http
//server to allow your server socket to listen for events on it
const io = require('socket.io')(http);


const port = process.env.PORT || 3000;


//how express does routing
app.get('/', (req, res) => {
	//tell app that static files can be found in public folder
	res.sendFile(__dirname + '/public/index.html');
});

//socket.io handler for when a client makes a connection 
io.on('connection', (socket) => {
	

	let chathandler = socket.handshake;
//	if (sessionStorage.userFirstName == null) {
//		chathandler = "client id " + socket.id;
//	} else {
//		chathandler = sessionStorage.userFirstName;
//	}
	let announcement = socket.id + " has entered the room";
	
	
	//this sends the announcement to all connected clients except the new socket instance
	socket.broadcast.emit('announcement',announcement);
	
	console.log("new connection: " + socket.id)//log to server console

	
	//you add handlers for messages and errors inside this one
	socket.once('message', msg => {
		io.emit('message', msg);
	});
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});