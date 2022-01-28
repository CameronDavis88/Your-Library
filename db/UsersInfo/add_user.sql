INSERT INTO users
(username, password, email)
VALUES
(${username}, ${hash}, ${email})
returning user_id, username, email;