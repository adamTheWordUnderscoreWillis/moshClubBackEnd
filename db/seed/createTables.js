const db = require('../index');

exports.createTables = ()=>{
    return db.query(
        `CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        user_name VARCHAR NOT NULL,
        review_count INT DEFAULT 0
        );`
    )
    .then(()=>{
        return db.query(
            `CREATE TABLE albums (
            album_id SERIAL PRIMARY KEY,
            album_name VARCHAR NOT NULL,
            artist_name VARCHAR NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            album_image_url VARCHAR,
            slap INT DEFAULT 0,
            zest INT DEFAULT 0,
            stick INT DEFAULT 0,
            score INT DEFAULT 0,
            review_count INT DEFAULT 0
            );`
        );
    })
    .then(()=>{
        return db.query(
            `CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            album_id INT,
            FOREIGN KEY (album_id) REFERENCES albums(album_id),
            slap INT DEFAULT 0,
            zest INT DEFAULT 0,
            stick INT DEFAULT 0,
            favourite_song VARCHAR,
            ten_Words VARCHAR,
            created_At TIMESTAMP DEFAULT NOW()
            );`
        );
    })
}