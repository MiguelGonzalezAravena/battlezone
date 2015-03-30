$(document).ready(function() {
  var figura = '0000'
    , fila1 = 0
    , fila2 = 0
    , fila3 = 0
    , fila4 = 0
  ;
  $('.caja, .cajaDerecha, .cajaUltima, .cajaFinal').click(function(e) {
    var id = parseInt(e.currentTarget.id)
      elem = $('#' + id)
      suma = 0
    ;
    switch(id) {
      case 1:
      case 5:
      case 9:
      case 13:
        suma = 8;
        break;
      case 2:
      case 6:
      case 10:
      case 14:
        suma = 4;
        break;
      case 3:
      case 7:
      case 11:
      case 15:
        suma = 2;
        break;
      case 4:
      case 8:
      case 12:
      case 16:
        suma = 1;
        break;
    }

    /**
     * Si el elemento no ha sido seleccionado, se pinta de azul
     * y se suma el valor a la fila respectiva
     */
    if(elem.css('background-color') !== 'rgb(0, 0, 255)') {
      elem.css('background-color', 'blue');

      switch(id) {
        case 1:
        case 2:
        case 3:
        case 4:
          fila1 += suma;
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          fila2 += suma;
          break;
        case 9:
        case 10:
        case 11:
        case 12:
          fila3 += suma;
          break;
        case 13:
        case 14:
        case 15:
        case 16:
          fila4 += suma;
          break;
      }

    } else {
      /**
       * En caso de que el elemento haya sido deseleccionado
       * se descolora el fondo y se resta a la fila según valor
       */
      elem.css('background-color', '#151B2E');

      switch(id) {
        case 1:
        case 2:
        case 3:
        case 4:
          fila1 -= suma;
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          fila2 -= suma;
          break;
        case 9:
        case 10:
        case 11:
        case 12:
          fila3 -= suma;
          break;
        case 13:
        case 14:
        case 15:
        case 16:
          fila4 -= suma;
          break;
      }
    }
    /**
     * Obtenemos nuestra figura final, pasando todo a hexadecimal
     */
    figura = fila1.toString(16) + fila2.toString(16) + fila3.toString(16) + fila4.toString(16);

    /** Mostramos la figura en un campo de sólo-lectura */
    $('#figuraHex').val('0x' + figura);
  });
});