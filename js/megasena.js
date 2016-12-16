var ultimo = "http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?f_megasena="


function getDezenas(texto) {
	var textoDezenas=texto.substring(texto.indexOf('<li>'),texto.indexOf('</ul>'));
	var re = /<li>(\d+)<\/li>/g
	var dezenas = []

	for(i=0; i<6; i++){
	    strNumero=re.exec(textoDezenas)[1];
	    dezenas.push(parseInt(strNumero));
    }
    return dezenas;
};


var concursos=[];
var ultimoErro;
var totalErros=0;

var request = require('request');

function getConcursosOnline(numeroConcurso, resultArray){
	var primeiro = "http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso="
	request({uri: primeiro+numeroConcurso, jar:true, encoding: 'latin1'}, function(error, response, data){
		if( !error && response.statusCode==200) {
			//var numeroConcurso = parseInt(data.substr(0, data.indexOf('|')));
			var dataConcurso = data.match(/.*<\/a>\|(\d+\/\d+\/\d+)/)[1]
			var dezenas=getDezenas(data);
			//var concurso = {"numero": numeroConcurso, "data": dataConcurso, "dezenas": dezenas};
			console.log("processando concurso "+numeroConcurso);
			//console.log(concurso);
			//concursos.push(concurso);
			resultArray.push({"numero": numeroConcurso, "data": dataConcurso, "dezenas": dezenas});
			//console.log(dezenas);

		} else {
			//totalErros+=1;
			//ultimoErro=error;
			resultArray.push(error);
		};	
	});
};

var texto='8|4.493.748,19|<span class="num_sorteio"><ul><li>53</li><li>17</li><li>38</li><li>04</li><li>47</li><li>37</li></ul></span>|0|0,00|60|16.084,11|5.262|183,40|<a class="btn_conc_ant_megasena" href="javascript:carrega_concurso(7);" tabindex="27" title="Ver concurso anterior">Ver concurso anterior</a>|<a class="btn_conc_prx_megasena" href="javascript:carrega_concurso(9);" tabindex="27" tilte="Ver próximo concurso">Ver próximo concurso</a>|29/04/1996|Brasília|DF|A||||0,00||<span class="num_sorteio"><ul><li>04</li><li>17</li><li>37</li><li>38</li><li>47</li><li>53</li></ul></span>||||';
var texto='so</a>|29/04/1996|Brasília|DF|A||||0,00||<spli>47</li><li>53</li></ul></span>||||';



