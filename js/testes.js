var fs=require('fs')
function loadConcursos() {
	var data,
	concursos;

	try {

		data = fs.readFileSync('concursos.txt'); 	
		try{
			concursos = JSON.parse(data);
		} catch (err) {
			console.log(err);
		}
		return concursos;

	} catch (err) {
 	  if (err.errno==-2) { //no such file or directory
 		return concursos =[];
 	  } else {
 		console.log(err);
 	  }
    }
};

function saveConcursos(concursos){
	var data = JSON.stringify(concursos);
	fs.writeFile('concursos.txt', data, function(err){
		if (err) {
			console.log('Error saving data.' + err.message)
		}
	});
};