DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments;

---------------------------------------------------

CREATE TABLE users(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  profile_photo_url TEXT

);

CREATE TABLE posts(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  photo_url TEXT,
  caption TEXT NOT NULL,
  tags TEXT[]

);

CREATE TABLE comments(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  comment_by BIGINT NOT NULL REFERENCES users(id),
  post_id BIGINT NOT NULL REFERENCES posts(id),
  comment TEXT NOT NULL

);

-- {
-- "email":"user@test.com",
-- "password": "password"
-- }

-- {
-- "commentBy":"1",
-- "post": "1",
-- "comment": "caption for testing comments 1 user"
-- }

-- {
-- "userId": "1",
-- "photoUrl": "password",
-- "caption": "caption for testing comments 1 user",
-- "tags": "tag 1"
-- }





-------------------
-- BONUSES --
-------------------


-- SELECT users.id
-- RANK() OVER(ORDER BY SUM(comments.id) DESC)
-- FROM comments
-- INNER JOIN posts
-- ON posts.id = comments.post_id
-- INNER JOIN users
-- ON users.id = posts.user_id
-- GROUP BY comment LIMIT 10

-- SELECT * FROM users
-- SELECT * FROM posts
-- SELECT * FROM comments

-- SELECT email, RANK() OVER (ORDER BY SUM(amount) DESC)
-- FROM customer
-- INNER JOIN rental
-- ON rental.customer_id = customer.customer_id
-- INNER JOIN payment
-- ON payment.rental_id = rental.rental_id
-- GROUP BY email

-- SELECT user_id FROM posts
-- JOIN users
-- ON user.users_id = post.users_id

-- RANK() OVER (ORDER BY COUNT(posts) DESC)

-- #2
-- SELECT user_id,
-- COUNT(posts), RANK() OVER (ORDER BY COUNT(posts) DESC)
-- FROM users
-- INNER JOIN posts
-- ON posts.user_id = users.id
-- GROUP BY posts.user_id
-- LIMIT 10

-- #1
-- SELECT user_id,
-- COUNT(posts), RANK() OVER (ORDER BY COUNT(comments) DESC)
-- FROM users
-- INNER JOIN posts
-- ON posts.user_id = users.id
-- INNER JOIN comments
-- ON comments.post_id = users.id
-- GROUP BY posts.user_id
-- LIMIT 10