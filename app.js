var express = require('express')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , playerCount = 0
  , id = 0
  , tagged = false
  , colors = []
  , color;
;

function defineColor() {
  if(colors.indexOf("red") == -1) {
    return "red";
  } else if(colors.indexOf("blue") == -1) {
    return "blue";
  } else if(colors.indexOf("yellow") == -1) {
    return "yellow";
  } else if(colors.indexOf("green") == -1) {
    return "green";
  } else {
    return "none";
  }
}

function delColor() {
  if(colors.indexOf("red") != -1 && colors.indexOf("blue") != -1 && colors.indexOf("yellow") != -1 && colors.indexOf("green") == -1) {
    return "green";
  } else if(colors.indexOf("red") != -1 && colors.indexOf("blue") != -1 && colors.indexOf("green") != -1 && colors.indexOf("yellow") == -1) {
    return "yellow";
  } else if(colors.indexOf("red") != -1 && colors.indexOf("yellow") != -1 && colors.indexOf("green") != -1 && colors.indexOf("blue") == -1) {
    return "blue";
  } else if(colors.indexOf("blue") != -1 && colors.indexOf("yellow") != -1 && colors.indexOf("green") != -1 && colors.indexOf("red") == -1) {
    return "red";
  } else {
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
      colors.push(defineColor());
    } else {
      socket.emit('connected', { playerId: id });
    }
    io.emit('count', { playerCount: playerCount });
  }, 1500);
  
  socket.on('disconnect', function () {
    playerCount--;
    if(delColor() != "none") {
      colors.splice(colors.indexOf(delColor()), 1);
    }
    console.log('Usuarios conectados: ' + playerCount);
    io.emit('count', { playerCount: playerCount });
  });
  
  socket.on('update', function (data) {
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
