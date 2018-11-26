/*
 *	Arquivo de funções de interação do lado Cliente
 * 	Para o Lado Servidor
 *
 */

$(document).ready(() => {
	//var socket = io.connect('http://localhost:8082/');
	var ready = false;
});

$( "input" )
  .keyup(function(){
    var nickname = $( this ).val();
  })
  .keyup();

var data = new Date();

console.log(`${nickname} logado às ${data.getYear()}`);

