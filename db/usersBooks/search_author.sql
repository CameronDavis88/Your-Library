select * from books
where user_id = $1  and author like $2;