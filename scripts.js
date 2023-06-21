function salvar(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var xmlreq = CriaRequest();

    //Tranformas Dados de entrada em Objeto
    var dadosCrud = {
        'nome': name,
        'email': email,
        'telefone': phone
    }

    var dadosJson = JSON.stringify(dadosCrud);
     
    //console.log(dadosJson);

    // Iniciar uma requisição
    xmlreq.open("POST", "crud.php?dadosJson="+ dadosJson , true);

    // Atribui uma função para ser executada sempre que houver uma mudança
    xmlreq.onreadystatechange = function(){

        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
        if (xmlreq.readyState == 4) {
            // Verifica se o arquivo foi encontrado com sucesso
            if (xmlreq.status == 200) {
                result.innerHTML = xmlreq.responseText;
            }else{
                result.innerHTML = "Erro: " + xmlreq.statusText;
            }
        }
    };
    xmlreq.send(null);
 }

 function atualizarAgenda(){
    console.log ("1");
    const xmlreq = new XMLHttpRequest();
    xmlreq.open("GET", "http://localhost/crud-master/crud.php");
    xmlreq.send();
    const data = xmlreq.response;
    console.log (data);

 }

 window.onload = () =>{
    atualizarAgenda();
 } 