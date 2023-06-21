 //Metodo que Cancelar/Limpar dados
 function restauraForm() {
    document.getElementById('id').value = "-1";
    //document.getElementById('name').value = "";
    //document.getElementById('email').value = "";
    //document.getElementById('phone').value = "";
    document.getElementById('btnSave').value = "Salvar"
}
//Metodo que carregar cadastrados
 function carregarLista() {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
            var verifica = this.responseText
            if(verifica == 1){
                document.getElementById('msgPHP').innerHTML = "Nenhum Cliente Cadastrado";
                document.getElementById('tbodyContacts').innerHTML = "";
            }else{
      		    document.getElementById('tbodyContacts').innerHTML = this.responseText;
                document.getElementById('msgPHP').innerHTML = "";
            }
    	} else {
    		document.getElementById('msgPHP').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	xhttp.open("POST", "crud.php", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send("action=list");
}
// Metodo que carrega cliente para Alterar
function carregarCliente( obj ) {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      		var resultado = JSON.parse( this.responseText );
      		//preenche form com dados do cliente para alteracao
      		document.getElementById('id').value 		= resultado[0].id;
      		document.getElementById('name').value 		= resultado[0].nome;
      		document.getElementById('email').value 		= resultado[0].email;
      		document.getElementById('phone').value 	= resultado[0].telefone;
      		//modifica acao do botao salvar para atualizar
      		document.getElementById('btnSave').value 	 = "Atualizar";
            document.getElementById('msgPHP').innerHTML = "";
    	} else {
    		document.getElementById('msgPHP').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	xhttp.open("POST", "crud.php", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send("action=buscar&id="+obj);
}
// Metodo que exclui registro
function excluirRegistro( obj ) {
	if ( confirm("Clique em OK para remover Cadastro.") ) {
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
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
	  	xhttp.open("POST", "crud.php", true);
	  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  	xhttp.send("action=excluir&id="+obj);
  	}
}
// Metodo que salva/altera registro
function salvarForm() {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
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
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var formData = new FormData();
  	formData.append('id', id );
  	formData.append('nome',name);
  	formData.append('email', email);
  	formData.append('telefone', phone);

    xhttp.open("POST", "crud.php", true);
  	xhttp.send( formData );
    
  	//atualiza lista de clientes
  	//carregarLista()
}

function hideMsg() {
	setTimeout(function() {
      	document.getElementById('msgPHP').classList.add("no-display"); 
    }, 5000);
}