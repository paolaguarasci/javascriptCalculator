// TODO
var $ = require('jquery');
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
//

var n = '';
var op = [];
var buff = [];
var history = [];

$( ".num p" ).click(function() {
  // if (buff.length === 0 || typeof buff[buff.length-1] !== 'number' ) {
  //   n += $( this ).html();
  //   $(".operation p").html(n);
  // }

  if (typeof buff[buff.length-1] === 'number' ) {
    buff.splice(0,buff.length);
    $(".result p").html('0');
  }
  n += $( this ).html();
  $(".operation p").html(n);
});

$( ".op p" ).click(function() {
  op.push($( this ).html());
  if (n){
  buff.push(parseFloat(n));
  }
  if (typeof buff[buff.length-1] === 'number' ) {
   buff.push($( this ).html());
  }
  $(".operation p").html(buff);
  n = '';
});

$(".res p").click(function() {
  if (n){
    buff.push(parseFloat(n));
  }

  if(typeof buff[buff.length-1] !== 'number') {
    buff.pop();
  }


  history.push(calc(buff));
  $(".result p").html(calc(buff));
  buff.splice(0,buff.length);
  buff.push(history[history.length-1]);
  n = '';
  $(".operation p").html('0');


});

$('.punto p').click(function(){
  if (n.indexOf('.') === -1 ) {
    n += $( this ).html();
    $(".operation p").html(n);
  }
});


// test result
// var test = [5, '*', 4, '*', 3, '*', 2, '*', 1];
// alert(test.join('') + ' = ' + calc(test));
