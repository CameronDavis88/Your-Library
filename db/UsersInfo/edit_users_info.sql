UPDATE users
SET password = ${hash}, email = ${email}, username = ${username}
WHERE user_id = ${userId};

SELECT user_id, username, email FROM users
WHERE user_id = ${userId};