UPDATE users
SET password = $1, email = $2, username = $3
WHERE user_id = $4;

SELECT user_id, username, email, password FROM users
WHERE user_id = $4;