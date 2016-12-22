var table=document.getElementById('table-concursos');
var btnOk=document.getElementById('btnOk');
var btnTodos=document.getElementById('btnTodos');
var btnLimpar=document.getElementById('btnLimpar');
var txtSorteio=document.getElementById('txtSorteio');
var sorteios;
var pageSize=15;
//var body=table.getElementsByTagName('tbody')[0];
function numericSort(a, b){return a-b;}

function addRow(data){
	var row, cell1, cell2, cell3;
	row = table.insertRow(1);
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell1.innerHTML=data['numero'];
	cell2.innerHTML=data['data'];
	cell3.innerHTML=data['dezenas'].sort(numericSort);
};


//btnLimpar.addEventListener("click", function(event){
function clearTable(){
	for (var i = table.rows.length - 1; i > 0; i--) {
		table.deleteRow(i);
	}
};

function populateTable(index){
	clearTable();
	for (var i = index - pageSize +1; i <= index; i++) {
		addRow(sorteios[i]);
	};
};

//btnTodos.addEventListener("click", function(e){
window.onload = function(e){
	var req = new XMLHttpRequest();
	req.onload = function(){
    	sorteios = JSON.parse(req.responseText);
    	populateTable(sorteios.length-1);
	};
	req.open('get', 'http://localhost:8446/all');
	req.send();
	return false;
};

btnOk.addEventListener("click", function(event){
	var indice = parseInt(txtSorteio.value);
	if (isNaN(indice)) {return false;};
	if (indice>sorteios.length-1) {
		indice=sorteios.length-1;
	} else if (indice<pageSize){
		indice=pageSize
	};
	populateTable(indice);
});

txtSorteio.addEventListener("keyup", function(event){
	//event.preventDefault();
	//alert(event.keyCode);
    if (event.keyCode==13) {
    	btnOk.click();
    };
    return false;
});