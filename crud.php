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
        loadList(); break;
    case "save":
        saveForm(); break;
    case "deleteTask":
        deleteTask(); break;
    case "research":
        loadTask(); break;
    case "status":
        changeStatus(); break;

}
// Method that loads data to table
function loadList() {
    //open database connection
    global $host, $user, $pass, $db;
    $mysqli = new mysqli( $host, $user, $pass, $db );
    if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
    //prear and execute list query
    $sql = "SELECT * FROM tarefas";
    if (!$res = $mysqli->query( $sql )) {
        echo "Erro ao executar SQL<br>";
        echo "Query: ".$sql."<br>";
        echo "Errno: ".$mysqli->errno."<br>";
        echo "Error: ".$mysqli->error."<br>";
        $res->close();
        exit;
    }
    //checks if there is data return
    if ($res->num_rows === 0) {
        echo "1";
        $res->close();
        exit;
    }
    $saida = '';
    //mount results table on the page
    while ($d = mysqli_fetch_array($res, MYSQLI_BOTH)) {
        //for completed tasks only delete option
        if($d['dbstatus'] == "ok" ) {
            $saida = $saida.  "  <tr>"
                . "  <td>".$d['id']."</td>"
                . "  <td>".$d['task']."</td>"
                . "  <td>".$d['dblocal']."</td>"
                . "  <td>".$d['dbtime']."</td>"
                . "  <td class='tdImgStatus' ><img src='img/".$d['dbstatus'].".png' class='imgTable' disabled='true' ><br>".$d['dbstatus']."</td>"
                . "  <td ><img src='img/editar.png' class='imgTable' id='btnFormEdit' disabled='true'(\"".$d['id']."\");'></td>"
                . "  <td ><img src='img/excluir.png' class='btnTable' id='btnFormDelete' onClick='deleteTask(\"".$d['id']."\");'></td>"
                . "  </tr>";
        } else{
            //for other edit option
            $saida = $saida.  "  <tr>"
                . "  <td>".$d['id']."</td>"
                . "  <td>".$d['task']."</td>"
                . "  <td>".$d['dblocal']."</td>"
                . "  <td>".$d['dbtime']."</td>"
                . "  <td class='tdImgStatus' id='tdImg".$d['id']."' ><img src='img/".$d['dbstatus'].".png' class='btnTable' onClick='alterarStatus(\"".$d['id']."\");'><br>".$d['dbstatus']."</td>"
                . "  <td ><img src='img/editar.png' class='btnTable' id='btnFormEdit' onClick='loadTask(\"".$d['id']."\");'></td>"
                . "  <td ><img src='img/excluir.png' class='btnTable' id='btnFormDelete' onClick='deleteTask(\"".$d['id']."\");'></td>"
                . "  </tr>";

        }
    }

    echo $saida;
    $res->close();
    $mysqli->close();
}
// Method that loads data selected for change
function loadTask() {
    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
    //retrieve ID to be fetched
    if ( isset( $_POST["id"] ) && is_numeric( $_POST["id"] ) ) {
        $id = (int) $_POST["id"];

        global $host, $user, $pass, $db;
        $mysqli = new mysqli( $host, $user, $pass, $db );
        if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
        
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
        //returns array in JSON format for reading via ajax
        echo json_encode( $results );

        $mysqli->close();
    } else {
        echo "ID nao encontrado.";
    }
}
// Method that saves/changes record
function saveForm() {
    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
    //rretrieve data from html form
    $id         = (int) $_POST["id"];
    $task       = $_POST["task"];
    $local      = $_POST["dblocal"];
    $time       = $_POST["dbtime"];
    $status     = $_POST["dbstatus"];
    
    global $host, $user, $pass, $db;
    $mysqli = new mysqli( $host, $user, $pass, $db );
    if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
    //prepare SQL for insert or update depending on form ID
    $sql = null;
    if ( $id > 1 ) {
        $sql = "UPDATE tarefas SET task=?, dblocal=?, dbtime=?, dbstatus=? WHERE id=".$id;
    } else {
        $sql = "INSERT INTO tarefas (task, dblocal, dbtime, dbstatus) VALUES (?, ?, ?, ? )";
    }
    //prepare and execute sql to insert the data
    $stmt = $mysqli->prepare( $sql );
    $stmt->bind_param('ssis', $task, $local, $time, $status); 
    $stmt->execute();
    //checks if update SQL was executed
    if ( $id > 1 ) {
        if ( $stmt->affected_rows > 0 ) {
            echo "Tarefa atualizada com sucesso!";
        } else {
            echo "Não houve necessidade de atualizar os dados, nenhum valor foi modificado.";
        }
    //checks if insert SQL was executed
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
// Method to delete record
function deleteTask() {
    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
    //retrieve ID to be deleted
    if ( isset( $_POST["id"] ) && is_numeric( $_POST["id"] ) ) {
        $id = (int) $_POST["id"];

        global $host, $user, $pass, $db;
        $mysqli = new mysqli( $host, $user, $pass, $db );
        if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
        //prepare and execute sql to delete the registry
        $stmt = $mysqli->prepare("DELETE FROM tarefas WHERE id=?");
        $stmt->bind_param('i', $id); 
        $stmt->execute();
        //checks if SQL was executed successfully
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

    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
}
// Method that Changes Status
function changeStatus() {
    if ( ! isset( $_POST ) || empty( $_POST ) ) {
        echo "Dados do formulário não chegaram no PHP.";
        exit;
    }
    //retrieve data from html form
    $id         = (int) $_POST["id"];
    $status     = $_POST["dbstatus"];
    // Changes Status
    if($status == "fazendo"){
        $status = "parado";
    }else{
        $status = "fazendo";
    }
    global $host, $user, $pass, $db;
    $mysqli = new mysqli( $host, $user, $pass, $db );
    if ( $mysqli->connect_errno ) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }
    //prepare and execute sql to fetch record
    $stmt = $mysqli->prepare( "UPDATE tarefas SET dbstatus=? WHERE id=".$id );
    $stmt->bind_param('s', $status); 
    $stmt->execute();
    echo "Tarefa atualizada com sucesso!";
    $mysqli->close();
}

