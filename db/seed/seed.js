const format = require("pg-format");
const db = require('../index');

const seed = ({reviewData, albumData, userData}) => {
    return db
    .query(`DROP TABLE IF EXISTS reviews;`)
    .then(()=>{
        return db.query(`DROP TABLE IF EXISTS albums;`)
    })
    .then(()=>{
       return  db.query(`DROP TABLE IF EXISTS users`)
    })
    .then(()=>{
        return db.query(
            `CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            user_name VARCHAR NOT NULL,
            review_count INT DEFAULT 0
            );`
        )
    })
        .then(()=>{
            return db.query(
                `CREATE TABLE albums (
                album_id SERIAL PRIMARY KEY,
                spotify_id VARCHAR NOT NULL,
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
                spotify_id VARCHAR,
                slap INT DEFAULT 0,
                zest INT DEFAULT 0,
                stick INT DEFAULT 0,
                favourite_song VARCHAR,
                ten_Words VARCHAR,
                created_At TIMESTAMP DEFAULT NOW()
                );`
            );
        })
    .then(()=>{
        const insertUsersDataQuery = format(
            'INSERT INTO users (user_name) VALUES %L',
            userData.map(({user_name})=>[user_name])
        )
        return db.query(insertUsersDataQuery);
    })
    .then(()=>{
        const insertAlbumDataQuery = format(
            'INSERT INTO albums (spotify_id, album_name, artist_name, user_id, slap, zest, stick, score, review_count) VALUES %L',
            albumData.map(({spotify_id ,album_name, artist_name, user_id, slap, zest, stick, score, review_count})=>[spotify_id, album_name, artist_name, user_id,slap, zest, stick, score, review_count])
        )
        return db.query(insertAlbumDataQuery);
    })
    .then(()=>{
        const insertReviewsDataQuery = format(
            'INSERT INTO reviews (user_id, spotify_id, slap, zest, stick) VALUES %L',
            reviewData.map(({user_id, spotify_id, slap, zest, stick})=>[user_id, spotify_id, slap, zest, stick])
        )
        return db.query(insertReviewsDataQuery);
    })
}

module.exports = seed;