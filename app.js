var express = require('express')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , playerCount = 0
  , id = 0
  , color
  , tagged = false
  , stage = [31][31]
;

function defineColor() {
  switch(playerCount) {
    case 1:
      return "red";
      break;
    case 2:
      return "blue";
      break;
    case 3:
      return "yellow";
      break;
    case 4:
      return "green";
      break;
    default:
      return "none";
  }
}

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('/index.html')
;});

io.on('connection', function (socket) {
  playerCount++;
  id++;
  console.log('Usuarios conectados: ' + playerCount);
  setTimeout(function () {
    if (!tagged) {
      socket.emit('connected', { playerId: id, color: defineColor() });
    } else {
      socket.emit('connected', { playerId: id });
    }
    io.emit('count', { playerCount: playerCount });
  }, 1500);
  
  socket.on('disconnect', function () {
    playerCount--;
    console.log('Usuarios conectados: ' + playerCount);
    io.emit('count', { playerCount: playerCount });
  });
  
  socket.on('update', function (data) {
    console.log('Socket update');
    if (data['tagged']) {
      tagged = true;
    }
    socket.broadcast.emit('updated', data);
  });
  
  socket.on('tag', function (data) {
    io.emit('tagged', data);
  });
});

setInterval(function () {
  tagged = false;
}, 3000);

server.listen(8080);
console.log("BattleZone app listening on port 80");
