SELECT * FROM books
JOIN users on books.user_id = users.user_id
WHERE users.user_id = $1
ORDER BY users_book_id desc;