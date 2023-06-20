<?php
    switch($_REQUEST["action"]){
        case 'Salvar':
            $name = $_POST["nome"];
            $email = $_POST["email"];
            $phone = $_POST["telefone"];

            $sql = "INSERT INT cliente (nome, email, telefone) VALUES ('{$name}', '{$email}','{$phone}')"; 
            $res = $conn->query($sql);
            break;
        
        case 'edit':
            //code
            break;

        case 'delete':
            //code
            break;
    }