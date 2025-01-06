// const { Pool } = require("pg");

// // Configurações do banco de dados
// const pool = new Pool({
//     user: "postgres", // Substitua pelo seu usuário do PostgreSQL
//     host: "localhost", // Endereço do servidor
//     database: "tcc_rodrigobichet", // Substitua pelo nome do seu banco
//     password: "Rootrb2025..", // Substitua pela senha do seu banco
//     port: 5432, // Porta padrão do PostgreSQL
// });

// module.exports = pool;

// const { Pool } = require("pg");

// // Configurações do pool de conexão
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL, // Render fornecerá essa variável
//     ssl: {
//         rejectUnauthorized: false, // Necessário para conexões seguras em produção
//     },
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres", // Seu usuário do banco
    host: "db.render.com", // Substitua pelo endereço correto do seu banco na Render
    database: "tcc_rodrigobichet", // Nome do seu banco de dados
    password: "Rootrb2025..", // A senha correta do banco
    port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
