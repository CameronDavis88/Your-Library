UPDATE books
SET title = $1, author = $2, image_url = $3
WHERE users_book_id = $4
returning books;