CREATE TABLE IF NOT EXISTS Categoria(
    id integer PRIMARY KEY AUTOINCREMENT,
    nome text not null
);

CREATE TABLE IF NOT EXISTS Tarefas(
    id integer PRIMARY KEY AUTOINCREMENT,
    titulo text not null,
    descricao text,
    status integer not null, 
  	id_categoria integer,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id)
);

INSERT INTO Categoria(nome) VALUES
('Trabalho'),
('Pessoal'),
('Estudos'),
('Saúde'),
('Lazer'),
('Finanças'),
('Projetos'),
('Familia'),
('Viagem'),
('Codar');


INSERT INTO Tarefas(titulo,descricao,status,id_categoria) VALUES 
('Lavar Louça', NULL, 0, 8),
('Estudar sql', 'criar tabelas e inserir dados', 0, 3), 
('Calculadora', 'Criar uma calculadora em python', 1, 10), 
('Code experiencie', 'fazer o curso code experince', 0, 2);

SELECT COUNT(*) As Contagem_de_Categoria
From Categoria;

select * from Categoria