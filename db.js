const { Pool } = require("pg");

// Configurações do banco de dados
const pool = new Pool({
    user: "postgres", // Substitua pelo seu usuário do PostgreSQL
    host: "localhost", // Endereço do servidor
    database: "tcc_rodrigobichet", // Substitua pelo nome do seu banco
    password: "Rootrb2025..", // Substitua pela senha do seu banco
    port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
