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

$( ".num p" ).click(function() {
  n += $( this ).html();
  $(".operation").html(buff);
});

$( ".op p" ).click(function() {
  op.push($( this ).html());
  buff.push(parseInt(n));
  buff.push($( this ).html());
  $(".operation").html(buff);
  n = '';
});

$(".res p").click(function() {
  buff.push(parseInt(n));
  $(".result p").html(calc(buff));
  console.log(buff);
  buff.splice(0,buff.length);
  n = '';
  $(".operation").html('0');

});



// test result
// var test = [5, '*', 4, '*', 3, '*', 2, '*', 1];
// alert(test.join('') + ' = ' + calc(test));
