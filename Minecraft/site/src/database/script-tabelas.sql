-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!
/* para workbench - local - desenvolvimento */
CREATE DATABASE baroneiros;

USE baroneiros;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
    fkQuiz int,
    foreign key (fkQuiz) references quiz(idQuiz)
);

create table quiz(
idQuiz int primary key auto_increment,
parte1 varchar(45),
parte2 varchar(45),
parte3 varchar(45),
parte4 varchar(45),
parte5 varchar(45),
pontos double
);

