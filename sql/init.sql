CREATE TABLE USUARIOS (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	cpf VARCHAR(255) NOT NULL UNIQUE,
	data_criacao TIMESTAMP DEFAULT NOW(),
	data_atualizacao TIMESTAMP DEFAULT NOW()
);

CREATE TABLE EVENTOS (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	titulo VARCHAR(255) NOT NULL,
	descricao text,
	data_criacao TIMESTAMP DEFAULT NOW(),
	data_atualizacao TIMESTAMP DEFAULT NOW(),
	data_inicio_evento TIMESTAMP,
	data_fim_evento TIMESTAMP,
	usuario_criacao VARCHAR(255),
	usuario_atualizacao VARCHAR(255),
	total_ingressos int,
	preco Decimal(10,2),
	FOREIGN KEY (usuario_criacao) REFERENCES usuarios(id),
	FOREIGN KEY (usuario_atualizacao) REFERENCES usuarios(id)
);

CREATE TABLE USUARIO_LOGIN (
	id varchar(255) NOT NULL PRIMARY KEY,
	id_usuario VARCHAR(255) NOT NULL UNIQUE,
	login varchar(255) NOT NULL,
	senha varchar(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	dt_atualizacao TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE PEDIDOS(
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	id_usuario VARCHAR(255) NOT NULL,
	id_evento varchar(255) NOT NULL,
	data_pedido TIMESTAMP NOT NULL DEFAULT NOW(),
	quantidade_pedido INTEGER,
	status_pedido VARCHAR(30),
	valor_total decimal(10, 2),
	FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id)
);
