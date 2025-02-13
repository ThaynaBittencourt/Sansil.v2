<!-- MINHA CONEXÃO PADRÃO -->

<?php
// Conexão com o banco de dados
$conn = new mysqli('127.0.0.1:3307', 'root', '123456', 'agendador');

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// MINHA CONEXÃO PADRÃO //





// Verifica se o formulário foi enviado via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $conn->real_escape_string($_POST['nome']);
    $email = $conn->real_escape_string($_POST['email']);
    $telefone = $conn->real_escape_string($_POST['telefone']);
    $profissional = $conn->real_escape_string($_POST['profissional']);
    $data = $conn->real_escape_string($_POST['data']);
    $hora = $conn->real_escape_string($_POST['hora']);

    // 
    $stmt = $conn->prepare("INSERT INTO agendamentos (nome, email, telefone, profissional, data, hora) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $nome, $email, $telefone, $profissional, $data, $hora);

    // Executa a query e verifica se deu certo
    if ($stmt->execute()) {
        echo "Agendamento realizado com sucesso!";
    } else {
        echo "Erro: " . $stmt->error;
    }

    // Fecha o statement
    $stmt->close();
}

// Fecha a conexão
$conn->close();
