<!-- CREATE DATABASE tcc_rodrigobichet;

-- Após criar o banco, selecione-o no painel esquerdo do pgAdmin
-- Depois, execute o comando abaixo para criar a tabela:

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
); -->

CREATE DATABASE tcc_rodrigobichet;

-- Após criar o banco, selecione-o no painel esquerdo do pgAdmin
-- Execute o comando abaixo para criar a tabela "users" com os novos campos:

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE, 
email VARCHAR(255) NOT NULL UNIQUE, 
password VARCHAR(255) NOT NULL,
profile_picture TEXT 
);
