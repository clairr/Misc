var ultimo="http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?f_megasena="
var primeiro= "http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso="

var concursos={lista:[]};
var ultimoErro;
var totalErros=0;

var request = require('request');
for (i=1; i<40; i++) {
	request({uri: primeiro+i, jar:true, encoding: 'latin1'}, function(error, req, data){
		if( !error ) {
			console.log("processando concurso "+ data.substr(0, data.indexOf('|')));
			concursos.lista.push(data.substr(0, data.indexOf('|')));

		} else {
			totalErros+=1;
			ultimoErro=error;
		};	
	});
};

