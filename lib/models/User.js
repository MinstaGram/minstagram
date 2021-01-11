const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  // -----------------------------------------

  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *;',
      [user.email, user.passwordHash]
    );

    return new User(rows[0]);
  }

  // -----------------------------------------

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if (!rows[0]) throw new Error(`No user with ${email} found`);
    return new User(rows[0]);
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }

  // --------------------------------------------
  // GET /users/popular
  // respond with the 10 users with the most total comments on their posts
  // for find popular bonus

  static async findPopularUsers() {
    const { rows } = await pool.query(
      `SELECT users.id, comment,
        RANK() OVER(ORDER BY SUM(comments.id) DESC)
        FROM comments
        INNER JOIN posts
        ON posts.id = comments.post_id
        INNER JOIN users
        ON users.id = posts.user_id
        GROUP BY comment, users.id, comments.id, posts.id LIMIT 10`
    );

    return rows.map(row => new Post(row));
  }

  // --------------------------------------------

};

// GET /users/popular
// respond with the 10 users with the most total comments on their posts

// GET /users/prolific
// respond with the 10 users with the most posts

// GET /users/leader
// respond with the 10 users with the most comments

// GET /users/impact
// respond with the 10 users with the highest $avg comments per post