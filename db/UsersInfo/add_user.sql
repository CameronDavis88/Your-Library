INSERT INTO users
(username, password, email)
VALUES
($1, $2, $3)
returning user_id, username, email;