
const statusList = ["Finalizar", "Fazer", "Parar"];
const ststusNova = ["Nova"]

//Method to cancel/clear data
 function restauraForm() {
    document.getElementById('id').value = "-1";
    document.getElementById('btnSave').value = "Salvar"
	const statusSelect = document.getElementById("selStatus");
	statusSelect.options.length = 0;
	ststusNova.forEach((status) => {
		option = new Option(status, status.toLowerCase());
		statusSelect.options[statusSelect.options.length] = option;
	  });
	statusSelect.disabled = true;
}
// Method that loads data to table
 function loadlist() {
	var xmlHttp;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
            var verifica = this.responseText
            if(verifica == 1){
                document.getElementById('msgPHP').innerHTML = "Pode Dormir Tranquilo";
                document.getElementById('tbodyTask').innerHTML = "";
            }else{
      		    document.getElementById('tbodyTask').innerHTML = this.responseText;
                document.getElementById('msgPHP').innerHTML = "";

			}
    	} 
  	};
  	xmlHttp.open("POST", "crud.php", true);
  	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xmlHttp.send("action=list");
}
// Method that loads data selected for change
function loadTask( obj ) {
	const statusSelect = document.getElementById("selStatus");
	statusSelect.options.length = 0;
	statusList.forEach((status) => {
		option = new Option(status, status.toLowerCase());
		statusSelect.options[statusSelect.options.length] = option;
	  });
	statusSelect.disabled = false;

	var xmlHttp;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      		var resultado = JSON.parse( this.responseText );
      		//fill in form with data for change
      		document.getElementById('id').value 		= resultado[0].id;
      		document.getElementById('task').value 		= resultado[0].task;
      		document.getElementById('local').value 		= resultado[0].dblocal;
      		document.getElementById('time').value 	    = resultado[0].dbtime;
      		document.getElementById('selStatus').value 	= resultado[0].dbstatus;
      		//modify action button 'salvar' to 'atualizar'
      		document.getElementById('btnSave').value 	 = "Atualizar";
    	} 
  	};
  	xmlHttp.open("POST", "crud.php", true);
  	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xmlHttp.send("action=research&id="+obj);
}
// Method to delete record
function deleteTask( obj ) {
	restauraForm()
	if ( confirm("Clique em OK para remover Tarefa.") ) {
		var xmlHttp;
		xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	      		loadlist();
	    	} 
	  	};
	  	xmlHttp.open("POST", "crud.php", true);
	  	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  	xmlHttp.send("action=deleteTask&id="+obj);
  	}
}
// Method that saves/changes record
function saveForm() {
	var dbstatus = document.getElementById("selStatus").value;
	console.log(dbstatus);
	 if(dbstatus == "fazer"){
		dbstatus = "Fazendo";
	}else if(dbstatus == "parar"){
		dbstatus = "Parado";
	}else if(dbstatus == "finalizar"){
	   dbstatus = "Finalizada";
	}else{
		dbstatus = "Pendente";
	}
	var xmlHttp;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		restauraForm();
    		document.getElementById('frmCrud').reset();
  			loadlist();
    	}
  	};
  	//recupera valores do form para enviar via ajax
    var formData = new FormData();
	formData.append("id", document.getElementById("id").value);
	formData.append("task", document.getElementById("task").value);
	formData.append("dblocal", document.getElementById("local").value);
	formData.append("dbtime", document.getElementById("time").value);
	formData.append("dbstatus",dbstatus)

	xmlHttp.open("POST", "crud.php?action=save", true);
	xmlHttp.send( formData );
	restauraForm();
}
//Method that changes status
function alterarStatus(obj){
	restauraForm()
	var xmlHttp;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	  		loadlist();
	    }
	};
	var formData = new FormData();
	formData.append("id", obj);
	formData.append("dbstatus", document.getElementById("tdImg"+obj).textContent);
	xmlHttp.open("POST", "crud.php?action=status", true);
	xmlHttp.send( formData );
}
