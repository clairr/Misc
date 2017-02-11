var table=document.getElementById('table-concursos');
var btnOk=document.getElementById('btnOk');
var ulResultado=document.getElementById('ulResultado');
var btnTodos=document.getElementById('btnTodos');
var btnLimpar=document.getElementById('btnLimpar');
var txtSorteio=document.getElementById('txtSorteio');
var sorteios;
var pageSize=16;

//function numericSort(a, b){return a-b;}

function sortData(data){
	for(i=1; i<data.length; i++){
		for(j=0; j<6; j++){
			if (data[i].dezenas[j]<10) data[i].dezenas[j]='0'+data[i].dezenas[j];
		}
		data[i].dezenas.sort();
	}
};

function addRow(data){
	var row, cell1, cell2, cell3;
	row = table.insertRow(1);
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell1.innerHTML=data['numero'];
	cell2.innerHTML=data['data'];
	cell3.innerHTML=data['dezenas']; //sort(numericSort);
	row.addEventListener("click", function(){
		populateResult(data['numero']);
	});
};

function populateResult(index){
    ulResultado.innerHTML='';
    var dzn=sorteios[index].dezenas;
    for(i=0; i<6; i++){
    	var li=document.createElement("li");
    	li.appendChild(document.createTextNode(dzn[i]));
    	ulResultado.appendChild(li);
    }
};

function populateTable(index){
	// clear table
	for (var i = table.rows.length - 1; i > 0; i--) {
		table.deleteRow(i);
	}
	for (var i = index - pageSize +1; i <= index; i++) {
		addRow(sorteios[i]);
	};
};

window.onload = function(e){
	var req = new XMLHttpRequest();
	req.onload = function(){
    	sorteios = JSON.parse(req.responseText);
    	sortData(sorteios);
    	populateTable(sorteios.length-1);
    	populateResult(sorteios.length-1);
	};
	req.open('get', 'http://localhost:8446/all');
	req.send();
	return false;
};

btnOk.addEventListener("click", function(event){
	var indice = parseInt(txtSorteio.value);
	var original = indice;
	if (isNaN(indice)) {return false;};
	if (indice>sorteios.length-1) {
		indice=sorteios.length-1;
		original=indice;
	} else if (indice<pageSize){
		indice=pageSize
	};
	populateTable(indice);
	populateResult(original)
});

txtSorteio.addEventListener("keyup", function(event){
    if (event.keyCode==13) {
    	btnOk.click();
    };
    return false;
});