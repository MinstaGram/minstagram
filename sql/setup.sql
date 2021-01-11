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

-- ------------users----------------------

-- {
-- "email":"user@test.com",
-- "password": "password"
-- }

-- ------------posts----------------------

-- {
-- "commentBy":"1",
-- "post": "1",
-- "comment": "caption for testing comments 1 user"
-- }

-- ------------posts----------------------

-- {
-- "userId": "1",
-- "photoUrl": "password",
-- "caption": "caption for testing comments 1 user",
-- "tags": "tag 1"
-- }