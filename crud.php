<?php
    $sql = "SELECT * FROM cliente";

    $res = $conn->query($sql);

    $rows = $res->num_rows;

    if($rows > 0 ){
        while ($row = $res->fecth_object()){
            print $row->id;
            print $row->nome;
            print $row->email;
            print $row->telefone;
        }
    }else{
        print "<p>Erro</p>"
    }
?>