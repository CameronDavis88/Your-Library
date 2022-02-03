CREATE TABLE users
(user_id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
password VARCHAR(250) NOT NULL,
email VARCHAR(200) NOT NULL);

CREATE TABLE books
(users_book_id SERIAL PRIMARY KEY,
gut_book_id INT,
title VARCHAR(200),
author VARCHAR(200),
image_url VARCHAR(500),
gut_url VARCHAR(500),
user_id INT REFERENCES users(user_id));