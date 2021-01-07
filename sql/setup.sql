DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts_comments;

-- ---------------------------------------------

CREATE TABLE users(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  profile_photo_url TEXT NOT NULL

);

CREATE TABLE posts(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  caption TEXT NOT NULL
  tags TEXT[]

);

CREATE TABLE comments(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  comment_by BIGINT NOT NULL REFERENCES posts(id),
  post BIGINT NOT NULL REFERENCES posts(id),
  comment TEXT NOT NULL

);

CREATE TABLE posts_comments(
  posts_id BIGINT REFERENCES posts(id),
  comments_id BIGINT REFERENCES comments(id),
  PRIMARY KEY(posts_id, comments_id)

);

