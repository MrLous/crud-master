//Method to cancel/clear data
 function restauraForm() {
    document.getElementById('id').value = "-1";
    document.getElementById('btnSave').value = "Salvar"
	document.getElementById('status').disabled = true;
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
	document.getElementById('status').disabled = false;
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
      		document.getElementById('status').value 	= resultado[0].dbstatus;
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
	formData.append("dbstatus", document.getElementById("status").value)

	xmlHttp.open("POST", "crud.php?action=save", true);
	xmlHttp.send( formData );
}
//Method that changes status
function alterarStatus(obj){
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
