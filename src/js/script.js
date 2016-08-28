var $ = require('jquery');
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// TODO
// X implementare la visulizzazione live dell'operazione
// - implementare i tasti AC e CE



// Calculator Core function
function calc(value) {
  var operators = {
      '+': function(a, b) { return a + b },
      '-': function(a, b) { return a - b },
      '/': function(a, b) { return a / b },
      '*': function(a, b) { return a * b },
  };

  var buffer = Array.from(value);
  var num = [];
  var op = [];

  for (var i = 0; i < buffer.length; i++) {
    if(i === 0 || i%2===0) {
      num.push(buffer[i]);
    } else if (i===1 || i%2===1){
      op.push(buffer[i]);
    }
  }

  var base = num[0];

  var x = 0;

  var result = num.reduce(function (a,b){
    var temp = operators[op[x]](a,b);
    x++;
    return temp;
  });

  return result;
}

// immissione dati
var n = '';
var op = [];
var buff = [];
var history = [];

// Eventi legati alla pressione dei numeri
$( ".num p" ).click(function() {

  if (typeof buff[buff.length-1] === 'number' ) {
    buff.splice(0,buff.length);
    $(".result p").html('0');
    $(".operation p").html('');
  }

  n += $( this ).html();

  if ($(".operation p").html() === '0' ){
    $(".operation p").html($( this ).html());
    $(".result p").html($(this).html());
  }

  if (n.length === 1){
    $(".result p").html($(this).html());
    $(".operation p").append($( this ).html());
  }  else {
    $(".operation p").append($( this ).html());
    $(".result p").append($(this).html());
  }
}); //fine eventi numeri

//Eventi legati alla pressione degli operatori
$( ".op p" ).click(function() {
  op.push($( this ).html());
  if (n){
  buff.push(parseFloat(n));
  }
  if (typeof buff[buff.length-1] === 'number' ) {
   buff.push($( this ).html());
   $(".operation p").append($( this ).html());
   $(".result p").html($(this).html());
  }

  n = '';
}); // fine eventi operatori

//Eventi legati alla pressione del tasto "="
$(".res p").click(function() {
  if (n){
    buff.push(parseFloat(n));
  }

  if(typeof buff[buff.length-1] !== 'number') {
    buff.pop();
  }

  history.push(calc(buff));
  $(".result p").html(calc(buff));
  $(".operation p").append('='+calc(buff));
  buff.splice(0,buff.length);
  buff.push(history[history.length-1]);
  n = '';
});// fine eventi "="

//Eventi lefati alla pressione del tasto "."
$('.punto p').click(function(){
  if (n.indexOf('.') === -1 ) {
    n += $( this ).html();
    $(".operation p").append($(this).html());
    $(".result p").append($(this).html());
  }
}); //fine eventi "."
