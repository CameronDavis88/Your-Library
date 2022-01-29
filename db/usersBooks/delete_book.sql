DELETE FROM books
WHERE users_book_id = $1
returning books;