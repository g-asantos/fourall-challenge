CREATE DATABASE movierental;
CREATE TABLE IF NOT EXISTS movierental.users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email  VARCHAR(255) NOT NULL,
	  password  VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS movierental.movies (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director  VARCHAR(255) NOT NULL,
    rented BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO movierental.movies (id,title, director, rented) VALUES ('$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi','Pulp Fiction', 'Tarantino', false);
INSERT INTO movierental.movies (id,title, director, rented) VALUES ('$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu','Grease', 'Randal Kleiser', true);
INSERT INTO movierental.movies (id,title, director, rented) VALUES ('$2y$12$m/Wlt54fo0aUwvlrQVia/u4zZB6iFszyzZFOjZQ8HYdyljtVbdLNW','Alien', 'Ridley Scott', false);
