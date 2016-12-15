var ultimo="http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?f_megasena="
var primeiro= "http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso=1"

var request = require('request');
request({uri: primeiro, jar:true, encoding: 'latin1'}, function(error, req, body){
  if( !error ) {
  	console.log(body)

  };	
});

