 //Metodo que Cancelar/Limpar dados
 function restauraForm() {
    document.getElementById('id').value = "-1";
    document.getElementById('btnSave').value = "Salvar"
	document.getElementById('status').disabled = true;
}
//Metodo que carregar cadastrados
 function carregarLista() {
	var xmlHttp;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
            var verifica = this.responseText
            if(verifica == 1){
                document.getElementById('msgPHP').innerHTML = "Pode Dormir Tranquilo";
                document.getElementById('tbodyTask').innerHTML = "";
				hideMsg();
            }else{
      		    document.getElementById('tbodyTask').innerHTML = this.responseText;
                document.getElementById('msgPHP').innerHTML = "";
            }
    	} else {
    		document.getElementById('msgPHP').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	xmlHttp.open("POST", "crud.php", true);
  	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xmlHttp.send("action=list");
}
// Metodo que carrega cliente para Alterar
function carregarTarefa( obj ) {
	document.getElementById('status').disabled = false;
	var xmlHttp;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      		var resultado = JSON.parse( this.responseText );
      		//preenche form com dados do cliente para alteracao
      		document.getElementById('id').value 		= resultado[0].id;
      		document.getElementById('task').value 		= resultado[0].task;
      		document.getElementById('local').value 		= resultado[0].dblocal;
      		document.getElementById('time').value 	    = resultado[0].dbtime;
      		document.getElementById('status').value 	= resultado[0].dbstatus;
      		//modifica acao do botao salvar para atualizar
      		document.getElementById('btnSave').value 	 = "Atualizar";
            document.getElementById('msgPHP').innerHTML = "";
    	} else {
    		document.getElementById('msgPHP').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	xmlHttp.open("POST", "crud.php", true);
  	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xmlHttp.send("action=buscar&id="+obj);
}
// Metodo que exclui registro
function excluir( obj ) {
	if ( confirm("Clique em OK para remover Tarefa.") ) {
		var xmlHttp;
		xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
                //exibe mensagem de sucesso na tela por alguns segundos
	      		document.getElementById('msgPHP').innerHTML = this.responseText;
	      		document.getElementById('msgPHP').classList.remove("no-display");
	      		hideMsg();
	  			carregarLista();
	    	} else {
	    		document.getElementById('msgPHP').innerHTML = "Erro na execucao do Ajax";
	    	}
	  	};
	  	xmlHttp.open("POST", "crud.php", true);
	  	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  	xmlHttp.send("action=excluir&id="+obj);
  	}
}
// Metodo que salva/altera registro
function salvarForm() {
	var xmlHttp;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		//limpa o formulario
    		restauraForm();
    		document.getElementById('frmCrud').reset();
    		//exibe mensagem de sucesso na tela por alguns segundos
      		document.getElementById('msgPHP').innerHTML = this.responseText;
      		document.getElementById('msgPHP').classList.remove("no-display");
      		document.getElementById('msgPHP').classList.add("msgPHP");
      		hideMsg();
  			//atualiza lista de clientes
  			carregarLista();
    	} else {
    		document.getElementById('msgPHP').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	//recupera valores do form para enviar via ajax
    var formData = new FormData();
	formData.append("id", document.getElementById("id").value);
	formData.append("task", document.getElementById("task").value);
	formData.append("dblocal", document.getElementById("local").value);
	formData.append("dbtime", document.getElementById("time").value);
	formData.append("dbstatus", document.getElementById("status").value)

	xmlHttp.open("POST", "crud.php?action=salvar", true);
	xmlHttp.send( formData );
}

function hideMsg() {
	setTimeout(function() {
    	document.getElementById('msgPHP').classList.add("no-display"); 
    }, 5000);
}
