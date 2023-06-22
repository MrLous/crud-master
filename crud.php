<?php

    //dados de conexao com banco de dados do sistema
    $host   = "localhost";
    $user   = "root";
    $pass   = "";
    $db     = "db_crud_teste";

    //captura acao que deve ser executada
    $servic = $_REQUEST["action"];

    //identifica acao e invoca metodo a ser executado
    switch ( $servic ) {
    case "list":
        carregarLista(); break;
    case "salvar":
        salvarForm(); break;
    case "excluir":
        delete(); break;
    case "buscar":
        carregarTarefa(); break;
}

function carregarLista() {
    //abre conexao com banco de dados
    global $host, $user, $pass, $db;
    $mysqli = new mysqli( $host, $user, $pass, $db );
    if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
    //preara e executa consulta de lista
    $sql = "SELECT * FROM tarefas";
    if (!$res = $mysqli->query( $sql )) {
        echo "Erro ao executar SQL<br>";
        echo "Query: ".$sql."<br>";
        echo "Errno: ".$mysqli->errno."<br>";
        echo "Error: ".$mysqli->error."<br>";
        $res->close();
        exit;
    }
    //verifica se existe retorno de dados
    if ($res->num_rows === 0) {
        echo "1";
        $res->close();
        exit;
    }
    $saida = '';
    //monta tabela de resultados na pagina
    while ($d = mysqli_fetch_array($res, MYSQLI_BOTH)) {
        $saida = $saida.  "  <tr>"
                . "  <td>".$d['id']."</td>"
                . "  <td>".$d['task']."</td>"
                . "  <td>".$d['dblocal']."</td>"
                . "  <td>".$d['dbtime']."</td>"
                . "  <td ><img src='img/".$d['dbstatus'].".png' class='btnTable' ></td>"
                . "  <td ><img src='img/editar.png' class='btnTable' id='btnFormEdit' onClick='carregarTarefa(\"".$d['id']."\");'></td>"
                . "  <td ><img src='img/excluir.png' class='btnTable' id='btnFormDelete' onClick='excluir(\"".$d['id']."\");'></td>"
                . "  </tr>";
    }

    echo $saida;
    $res->close();
    $mysqli->close();
}
// Metodo que carrega dados do cliente selecionado para alteracao
function carregarTarefa() {
    //var_dump($_POST);
    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
    //recupera ID a ser buscado
    if ( isset( $_POST["id"] ) && is_numeric( $_POST["id"] ) ) {
        $id = (int) $_POST["id"];

        //abre conexao com banco
        global $host, $user, $pass, $db;
        $mysqli = new mysqli( $host, $user, $pass, $db );
        if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
        //prepara e executa sql para buscar registro
        $stmt = $mysqli->prepare("SELECT * FROM tarefas WHERE id=?");
        $stmt->bind_param('i', $id);
        $stmt->execute();

        $meta = $stmt->result_metadata();
        while ($field = $meta->fetch_field()) {
            $parameters[] = &$row[$field->name];
        }

        call_user_func_array(array($stmt, 'bind_result'), $parameters);
        while ($stmt->fetch()) {
            foreach($row as $key => $val) {
                $x[$key] = $val;
            }
            $results[] = $x;
        }
        //retorna array em formato JSON para leitura via ajax
        echo json_encode( $results );

        $mysqli->close();
    } else {
        echo "ID nao encontrado.";
    }
}
// Metodo que salva ou atualiza form de cadastro do cliente
function salvarForm() {
    //var_dump($_POST);
    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
    //recupera dados do formulario html
    $id         = (int) $_POST["id"];
    $task       = $_POST["task"];
    $local      = $_POST["dblocal"];
    $time       = $_POST["dbtime"];
    $status     = $_POST["dbstatus"];
    //abre conexao com banco
    global $host, $user, $pass, $db;
    $mysqli = new mysqli( $host, $user, $pass, $db );
    if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
    //prepara SQL para insert ou update dependendo do ID do form
    $sql = null;
    if ( $id > 1 ) {
        $sql = "UPDATE tarefas SET task=?, dblocal=?, dbtime=?, dbstatus=? WHERE id=".$id;
    } else {
        $sql = "INSERT INTO tarefas (task, dblocal, dbtime, dbstatus) VALUES (?, ?, ?, ? )";
    }
    //prepara e executa sql para insert dos dados
    $stmt = $mysqli->prepare( $sql );
    $stmt->bind_param('ssis', $task, $local, $time, $status); 
    $stmt->execute();
    //verifica se SQL de update foi executado
    if ( $id > 1 ) {
        if ( $stmt->affected_rows > 0 ) {
            echo "Tarefa atualizada com sucesso!";
        } else {
            echo "Não houve necessidade de atualizar os dados, nenhum valor foi modificado.";
        }
    //verifica se SQL de insert foi executado
    } else {
        if ( $stmt->affected_rows > 0 ) {
            echo "Tarefa cadastrada com sucesso!";
        } else {
            echo "Error: ".$stmt;
            exit;
        }
    }

    $mysqli->close();
}
// Metodo que exclui registro do cliente
function delete() {
    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
    //recupera ID a ser deletado
    if ( isset( $_POST["id"] ) && is_numeric( $_POST["id"] ) ) {
        $id = (int) $_POST["id"];

        //abre conexao com banco
        global $host, $user, $pass, $db;
        $mysqli = new mysqli( $host, $user, $pass, $db );
        if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
        //prepara e executa sql para delete do registro
        $stmt = $mysqli->prepare("DELETE FROM tarefas WHERE id=?");
        $stmt->bind_param('i', $id); 
        $stmt->execute();
        //verifica se SQL foi executado com sucesso
        if ( $stmt->affected_rows > 0 ) {
            echo "Registro deletado com sucesso!";
        } else {
            echo "Error: ".$stmt;
            exit;
        }
        $mysqli->close();
    } else {
        echo "ID invalido para delete.";
    }
}