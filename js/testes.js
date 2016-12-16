var ultimo="http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?f_megasena="
var primeiro= "http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso="

function getDezenas(texto) {
	var textoDezenas=texto.substring(texto.indexOf('<li>'),texto.indexOf('</ul>'));
	var re = /<li>(\d+)<\/li>/g
	var dezenas = []

	for(i=0; i<6; i++){
	    //dezenas.push(re.exec(textoDezenas)[1]);
	    strNumero=re.exec(textoDezenas)[1];
	    dezenas.push(parseInt(strNumero));
    }
    return dezenas;
}

var concursos={lista:[]};
var ultimoErro;
var totalErros=0;

var request = require('request');
for (i=1; i<20; i++) {
	request({uri: primeiro+i, jar:true, encoding: 'latin1'}, function(error, req, data){
		if( !error ) {
			console.log("processando concurso "+ data.substr(0, data.indexOf('|')));
			var dezenas=getDezenas(data);
			concursos.lista.push(dezenas);
			console.log(dezenas);

		} else {
			totalErros+=1;
			ultimoErro=error;
		};	
	});
};

var texto='8|4.493.748,19|<span class="num_sorteio"><ul><li>53</li><li>17</li><li>38</li><li>04</li><li>47</li><li>37</li></ul></span>|0|0,00|60|16.084,11|5.262|183,40|<a class="btn_conc_ant_megasena" href="javascript:carrega_concurso(7);" tabindex="27" title="Ver concurso anterior">Ver concurso anterior</a>|<a class="btn_conc_prx_megasena" href="javascript:carrega_concurso(9);" tabindex="27" tilte="Ver próximo concurso">Ver próximo concurso</a>|29/04/1996|Brasília|DF|A||||0,00||<span class="num_sorteio"><ul><li>04</li><li>17</li><li>37</li><li>38</li><li>47</li><li>53</li></ul></span>||||';



