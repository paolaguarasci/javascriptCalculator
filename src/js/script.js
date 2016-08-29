var $ = require('jquery');
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO
// X implementare la visulizzazione live dell'operazione
// X implementare i tasti AC e CE
// X limite cifre (10?) [Edit: mezzo risolto, non del tutto]
// X bug 111111111*111111111


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

// Variabili globali
var n = '';
var op = [];
var buff = [];
var history = [];
var result = $(".result p");
var operation = $(".operation p");

// Eventi legati alla pressione dei numeri
$( ".num" ).click(function() {
  var html = $( this ).children().html();
  if (typeof buff[buff.length-1] === 'number' ) {
    buff.splice(0,buff.length);
    result.html('0');
    operation.html('');
  }

  if (operation.html() === '0' || operation.html() === 'max limit!' ){
    operation.html(html);
    result.html(html);
    n += html;
  } else if (n.length === 0) {
    result.html(html);
    operation.append(html);
    n += html;
  }  else if(n.length < 10) {
    operation.append(html);
    result.append(html);
    n += html;
  }
  // else {
  //   n = '';
  //   result.html("max limit!");
  //   operation.html("max limit!");
  // }

checkOp ();

}); //fine eventi numeri

//Eventi legati alla pressione degli operatori
$( ".op" ).click(function() {
  var html = $( this ).children().html();
  op.push(html);
  if (n){
  buff.push(parseFloat(n));
  }
  if (buff.length === 1) {
  operation.html(buff);
  }
  if (typeof buff[buff.length-1] === 'number' ) {
   buff.push(html);
   operation.append(html);
   result.html(html);
  }

checkOp ();
  n = '';
}); // fine eventi operatori

//Eventi legati alla pressione del tasto "="
$(".res").click(function() {
  if (n){
    buff.push(parseFloat(n));
  }
  if(typeof buff[buff.length-1] !== 'number') {
    buff.pop();
  }

  var calcoli = calc(buff);
  var calcoliRounded = calcoli.toPrecision(6);

  history.push(calcoli);
  result.html(calcoliRounded);
  operation.html(buff.join('') + '='+ calcoliRounded);
  buff.splice(0,buff.length);
  buff.push(history[history.length-1]);
  n = '';
  checkOp ();
});// fine eventi "="

//Eventi legati alla pressione del tasto "."
$('.punto').click(function(){
  var html = $( this ).children().html();

  if (typeof buff[buff.length-1] === 'number' ) {
    buff.splice(0,buff.length);
    result.html('0');
    operation.html('');
  }

  if (n.indexOf('.') === -1 && n.length !== 0) {
    n += html;
    operation.append(html);
    result.append(html);
  } else if (n.length === 0 ){
    n += html;
    operation.html(html);
    result.html(html);
  }

checkOp ();



}); //fine eventi "."

//Eventi legati alla pressione del tasto "CE"
$('.ce').click(function(){
    buff.pop();
    operation.html(buff);
    result.html('0');
    n = '';
    if (buff.length === 0) {
      operation.html('0');
    }
}); // fine eventi CE

//Eventi legati alla pressione del tasto "AC"
$('.ac').click(function(){
    buff.splice(0,buff.length);
    operation.html('0');
    result.html('0');
    n = '';
}); // fine eventi CE


$(".tasti").mouseup(function() {
  $(this).removeClass("premuto").addClass("ombra");
  var height = parseFloat($(this).css("height")) + 3;
  $(this).css("height", height.toString()+"px");
});

$(".tasti").mousedown(function() {
  $(this).addClass("premuto").removeClass("ombra");
  var height = parseFloat($(this).css("height")) - 3;
  $(this).css("height", height.toString()+"px");
});

function checkOp () {
  var htmlPre = operation.html();
  var newString = htmlPre.slice(-25);
  if (htmlPre.length > 25) {
    operation.html(newString);
  }
}
