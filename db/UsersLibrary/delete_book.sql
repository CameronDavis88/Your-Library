DELETE FROM books
WHERE gut_book_id = $1
returning books;