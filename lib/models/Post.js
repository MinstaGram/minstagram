const pool = require('../utils/pool');

module.exports = class Post {
    userId;
    photoUrl;
    caption;
    tags;

    constructor(row) {
        this.userId = row.user_id;
        this.photoUrl = row.photo_url;
        this.caption = row.caption;
        this.tags = String(row.tags);
    }

    static async insert({ userId, photoUrl, caption, tags }) {
        const { rows } = await pool.query(
            `INSERT INTO posts (user_id, photo_url, caption, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [userId, photoUrl, caption, tags]);

        return new Post(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            `SELECT * FROM posts ORDER BY id ASC`
        );

        return rows.map(row => new Post(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM posts 
            WHERE id = $1 
            ORDER BY id ASC`,
            [id]);

        return new Post(rows[0]);
    }

    static async update(id, { userId, photoUrl, caption, tags }) {
        const { rows } = await pool.query(
            `UPDATE posts
            SET
            user_id = $1,
            photo_url = $2,
            caption = $3,
            tags = $4
            WHERE id = $5
            RETURNING *`,
            [userId, photoUrl, caption, tags, id]);

        return new Post(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM posts WHERE id = $1 RETURNING *`,
            [id]);

        return new Post(rows[0])
    }
}