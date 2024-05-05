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
	usuario_criacao VARCHAR(255) NOT NULL,
	usuario_atualizacao VARCHAR(255) NOT NULL,
	FOREIGN KEY (usuario_criacao) REFERENCES usuarios(id),
	FOREIGN KEY (usuario_atualizacao) REFERENCES usuarios(id)
);

CREATE TABLE INGRESSOS (
	id varchar(255) NOT NULL PRIMARY KEY,
	id_evento VARCHAR(255) NOT NULL,
	quantidade_total integer not null,
	FOREIGN KEY (id_evento) REFERENCES eventos(id)
);

CREATE TABLE LOTE_INGRESSOS (
	id varchar(255) NOT NULL PRIMARY KEY,
	id_ingresso VARCHAR(255) NOT NULL,
	quantidade integer NOT NULL,
	data_inicio_periodo DATE NOT NULL,
	data_fim_periodo DATE NOT NULL,
	data_criacao TIMESTAMP DEFAULT NOW(),
	valor_unitario DECIMAL(10, 2) not null,
	FOREIGN KEY (id_ingresso) REFERENCES ingressos(id)
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
	data_pedido TIMESTAMP NOT NULL DEFAULT NOW(),
	quantidade_pedido INTEGER NOT NULL,
	status_pedido VARCHAR(30) NOT NULL,
	valor_total decimal(10, 2) NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id)
);
