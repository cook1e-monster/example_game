const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//server config
app.set('view engine', 'ejs'); //define engine views in express
server.listen(3000);


//routes
app.get('/', function (req, res) {
  res.render(__dirname + '/client/views/index')
});


/* send message like broadcast */
var clients = [];
io.on('connection', function (socket) {
  socket.iduser = clients.length + 1
  clients.push(socket)

  socket.on('recive', function ( data ) {
    clients.forEach(function( client ){
      if( client.iduser !== socket.iduser ) {
        client.emit( 'send', data )
      }
    })
  })
})
