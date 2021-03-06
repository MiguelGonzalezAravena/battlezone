require(['socket.io/socket.io.js']);

var players = []
  , socket = io.connect('http://10.200.6.60:8080')
  , UiPlayers = document.getElementById("players")
  , selfId, selfColor, player, c, actor
;

$(document).ready(function() {
  socket.on('count', function (data) {
    UiPlayers.innerHTML = 'Players: ' + data['playerCount'];
    users = data['playerCount'];

  });
  /* Cargando escenario */
  $.getJSON('/stages/arena.json', function(data) {
    for(var i = 0, len = data.length; i < len; ++i) {
      var d = data[i];
      for(var j = 0, len2 = d.length; j < len2; ++j){
        var e = d[j];
        c = (e == 0) ? 'cajaVacia' : (i == len-1 && j == len2-1) ? 'cajaFinal' : (j == len2-1) ? 'cajaDerecha' : (i == len-1) ? 'cajaUltima' : 'caja';
        $('#stage').append('<div id="'+i+'_'+j+'" data-color="" data-nivel="0" data-value="'+e+'" data-j="'+j+'" data-i="'+i+'" class="'+c+'"></div>');
      }
    }
  });

  /* Cargando posición inicial jugadores */
  socket.on('connected', function (data) {
    console.log(data);
    selfId = data['playerId'];
    selfColor = data['color'];
    switch(selfColor) {
      case "red":
        $('#0_0')
        .data('color', 'red')
        ;
        break;
      case "blue":
        $("#30_30")
        .data('color', 'blue')
        ;
        break;
      case "yellow":
        $('#0_30')
        .data('color', 'yellow')
        ;
        break;
      case "green":
        $('#30_0')
        .data('color', 'green')
        ;
        break;
    }

    socket.on('updated', function (data) {
      actor = players.filter(function (obj) {
        return obj.playerId == data['playerId'];
      })[0];
      if (actor) {
        actor.player.i = data['i'];
        actor.player.j = data['j'];
        actor.player.color = data['color'];
        actor.player.nivel = data['nivel']++;
      } else {
        var temp = { playerId: data['playerId'], i: data['i'], j: data['j'], color: data['color'], nivel: data['nivel'] };
        players.push({ player: temp, playerId: data['playerId'] });
      }  
    });

    socket.on('tagged', function (data) {
      if (data['playerId'] == selfId) {
        player.p.sheet = 'enemy';
        player.p.tagged = true;
      } else {
        var actor = players.filter(function (obj) {
          return obj.playerId == data['playerId'];
        })[0];
        if (actor) {
          actor.player.p.sheet = 'enemy'
        }
      }
    });

    $('#1_2').click(function() {
      console.log('Hola' + data);
    });
  });

  
});
