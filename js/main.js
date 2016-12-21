

var table=document.getElementById('table-concursos');
var btnOk=document.getElementById('btnOk');
var inSorteio=document.getElementById('sorteio')
//var body=table.getElementsByTagName('tbody')[0];


btnOk.addEventListener("click", function(e){
	//alert("");
	var req = new XMLHttpRequest();
	req.onload = function(){
		var row, cell1, cell2, cell3;
		var data = JSON.parse(req.responseText);
		var dezenas = data.dezenas;
		//e.preventDefault();
		row = table.insertRow(1);
		cell1 = row.insertCell(0);
		cell2 = row.insertCell(1);
		cell3 = row.insertCell(2);
		cell1.innerHTML=data['numero'];
		cell2.innerHTML=data['data'];
		cell3.innerHTML=dezenas;
		alert(dezenas);
			
		};
	req.open('GET', 'http://curipira:8446/'+inSorteio.value);
	req.send();
	return false;
		
});

