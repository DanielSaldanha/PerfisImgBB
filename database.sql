CREATE DATABASE IF NOT EXISTS perfis_db;
USE perfis_db;

CREATE TABLE IF NOT EXISTS perfil (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  profissao VARCHAR(255) NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  caminhoImagem VARCHAR(255) NOT NULL
);

INSERT INTO perfil (nome, profissao, cargo, caminhoImagem) VALUES 
('João Silva', 'Desenvolvedor', 'Full Stack', 'https://i.ibb.co/example1.jpg'),
('Maria Oliveira', 'Designer', 'UI/UX', 'https://i.ibb.co/example2.jpg');
