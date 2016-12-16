
function getConcursosOnline(numeroConcurso, resultArray){

	// extrai dezenas do texto html retornado
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

  var request = require('request');
  var primeiro = "http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso=";
  var ultimo   = "http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?f_megasena=";
  var target;

  if(numeroConcurso!=0) 
    {target = primeiro+numeroConcurso}
  else
    {target = ultimo};
  console.log(target);

  request({uri: target, jar:true, encoding: 'latin1'}, function(error, response, data){
    if( !error && response.statusCode==200) {    	
      var dataConcurso = data.match(/.*<\/a>\|+(\d+\/\d+\/\d+)/)[1]
	    var dezenas=getDezenas(data);
	    if(numeroConcurso==0) numeroConcurso=data.substring(0, data.indexOf('|'));
	    console.log("processando concurso "+numeroConcurso);
	    resultArray[numeroConcurso] = {"numero": numeroConcurso, "data": dataConcurso, "dezenas": dezenas};
    } else {
	  resultArray[0] = error;
	};	
  });
};

var texto='8|4.493.748,19|<span class="num_sorteio"><ul><li>53</li><li>17</li><li>38</li><li>04</li><li>47</li><li>37</li></ul></span>|0|0,00|60|16.084,11|5.262|183,40|<a class="btn_conc_ant_megasena" href="javascript:carrega_concurso(7);" tabindex="27" title="Ver concurso anterior">Ver concurso anterior</a>|<a class="btn_conc_prx_megasena" href="javascript:carrega_concurso(9);" tabindex="27" tilte="Ver próximo concurso">Ver próximo concurso</a>|29/04/1996|Brasília|DF|A||||0,00||<span class="num_sorteio"><ul><li>04</li><li>17</li><li>37</li><li>38</li><li>47</li><li>53</li></ul></span>||||';
