create table users(
	id serial primary key,
	username varchar not null unique,
	password varchar not null
);

INSERT INTO users (username, password)
VALUES 
    ('john_doe', 'password123'),
    ('jane_smith', 'qwerty456'),
    ('michael_brown', 'abc12345'),
    ('emily_davis', 'pass7890'),
    ('david_clark', 'mypassword'),
    ('sophia_jones', 'secure123'),
    ('william_johnson', 'password678'),
    ('olivia_martinez', 'login2024'),
    ('james_garcia', 'testuser1'),
    ('ava_hernandez', 'adminpass');
   

create table posts(
	id serial primary key,
	user_id integer not null,
	title varchar not null,
	content text not null,
	constraint fk_posts_users foreign key (user_id) references users(id)
)

insert into posts(user_id, title, content) VALUES(1,'Publicación De inicio', 'Contenido de la publicación inicial');
insert into posts(user_id, title, content) VALUES(1,'Instroducción JS', 'Ejemplos asociados a Javascript');
insert into posts(user_id, title, content) VALUES(5,'Fundamentos de Desarrollo Backend', 'Publicación de API y definición de rutas');