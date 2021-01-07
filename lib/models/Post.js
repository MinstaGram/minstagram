const pool = require('../utils/pool');

module.exports = class Post {
    user;
    pic_url;
    caption;
    tags;

    constructor(row) {
        this.user = row.user;
        this.picUrl = row.pic_url;
        this.caption = row.caption;
        this.tags = row.tags;
    }

    static async insert({ user, picUrl, caption, tags }) {
        const { rows } = await pool.query(
            `INSERT INTO posts (user, pic_url, caption, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [user, picUrl, caption, tags]);

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

    static async update(id, { user, picUrl, caption, tags }) {
        const { rows } = await pool.query(
            `UPDATE posts
            SET
            user = $1,
            pic_url = $2,
            caption = $3,
            tags = $4
            WHERE id = $5
            RETURNING *`,
            [user, picUrl, caption, tags, id]);

        return new Post(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM posts WHERE id = $1 RETURNING *`,
            [id]);

        return new Post(rows[0])
    }
}