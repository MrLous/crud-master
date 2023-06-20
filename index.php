<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Agenda - Crud</title>
    <link rel="stylesheet" href="styles.css">   
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Arvo:ital@1&family=Flow+Circular&family=Kanit:wght@200&family=Tsukimi+Rounded&display=swap" rel="stylesheet">
 </head>

<body>
    <nav id="msg-php" class="nav">
        <img src="img/logo.png" alt="" id="logo">
        <h2>Agenda - CRUD <p>by じゅ</p></h2>
    </nav>

    <form method="POST" id="crudForm">
    <section id=sctDado>
        <input id="nome" type=text class="inputText" required placeholder="Digite seu nome" name="nome" />
        <input id="email" type=email class="inputText" placeholder="Informe seu email" name="email"/>
        <input id="telefone" type=number class="inputText" placeholder="Digite seu telefone" name="telefone"/>
    </section>
    <section id=sctButton>
        <input type=reset class="button" id="btnClean" value="Limpar"/>
        <input type=submit class="button"id="btnSave" value="Salvar"/>
    </section>
    </form>
    <section id="divList">
        <table>Contatos
            <thead>
                <tr>
                    <th id="thCode">Código</th>
                    <th id="thName">Nome</th>
                    <th id="thEmail">Email</th>
                    <th id="thPhone">Telefone</th>
                    <th class="thBtn">Editar</th>
                    <th class="thBtn">Remover</th>
                </tr>
            </thead> 
            <tbody id="tbodyContacts">      
                </tr>         
            </tbody>
        </table>
    </section>
    <div id="divPhp">
        <?php
            include("config.php");
            switch(@$_REQUEST["action"]){
                case "Salvar":
                    include("crud.php");
                break;
                case "delete":
                    include("crud.php");
                break;
                default:
                    print "Cadastre um Contato ";
            }
        ?>
    </div>

</body>
</html>