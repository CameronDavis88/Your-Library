UPDATE books
SET author = $1
WHERE gut_book_id = $2
returning books;