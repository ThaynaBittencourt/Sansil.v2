const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Importa o mysql2
const app = express();
const port = 3000;

// Usar body-parser para tratar dados enviados via POST (formulários)
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // Altere para o seu host (ex: localhost, IP, ou URL)
    user: 'root', // Seu usuário do MySQL
    password: '', // Sua senha do MySQL
    database: 'agendador' // O nome do seu banco de dados
});

// Verificar a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota para processar o envio do formulário (POST para /agendar)
app.post('/agendar', (req, res) => {
    const { nome, email, telefone, profissional, data, hora } = req.body;

    // Inserir os dados no banco de dados
    const query = `INSERT INTO agendamentos (nome, email, telefone, profissional, data, hora) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.execute(query, [nome, email, telefone, profissional, data, hora], (err, results) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados: ', err);
            res.status(500).send('Erro ao agendar!');
            return;
        }
        console.log(`Agendamento realizado: ${nome} - ${data} às ${hora}`);
        res.send('Agendamento realizado com sucesso!');
    });
});

// Rota GET para servir a página do formulário
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/agendar.html'); // Supondo que o HTML está no mesmo diretório
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
