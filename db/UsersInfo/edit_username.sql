UPDATE users
SET username = ${username}
WHERE user_id = ${id};

SELECT user_id, username, email FROM users
WHERE user_id = ${id};