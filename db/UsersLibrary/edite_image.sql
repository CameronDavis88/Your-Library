UPDATE books
SET image_url = $1
WHERE gut_book_id = $2
returning books;