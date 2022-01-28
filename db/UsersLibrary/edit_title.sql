UPDATE books
SET title = $1
WHERE gut_book_id = $2
returning books;
