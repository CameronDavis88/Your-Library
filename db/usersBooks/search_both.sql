select * from books
where user_id = $1  and title like $2 and author like $3;