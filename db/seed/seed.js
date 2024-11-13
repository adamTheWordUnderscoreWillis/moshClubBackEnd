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
                slap DECIMAL(4,1) DEFAULT 0.0,
                zest DECIMAL(4,1) DEFAULT 0.0,
                stick DECIMAL(4,1) DEFAULT 0.0,
                review_count INT DEFAULT 0
                );`
            );
        })
        .then(()=>{
            return db.query(
                `CREATE TABLE reviews (
                review_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                spotify_id VARCHAR NOT NULL,
                slap DECIMAL(2,1) DEFAULT 0.0 NOT NULL,
                zest DECIMAL(2,1) DEFAULT 0.0 NOT NULL,
                stick DECIMAL(2,1) DEFAULT 0.0 NOT NULL,
                favourite_song VARCHAR NOT NULL,
                ten_Words VARCHAR NOT NULL,
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
            'INSERT INTO albums (spotify_id, album_name, artist_name, user_id, slap, zest, stick, review_count) VALUES %L',
            albumData.map(({spotify_id ,album_name, artist_name, user_id, slap, zest, stick, review_count})=>[spotify_id, album_name, artist_name, user_id,slap, zest, stick, review_count])
        )
        return db.query(insertAlbumDataQuery);
    })
    .then(()=>{
        const insertReviewsDataQuery = format(
            'INSERT INTO reviews (user_id, spotify_id, slap, zest, stick, favourite_song, ten_words, created_at) VALUES %L',
            reviewData.map(({user_id, spotify_id, slap, zest, stick, favourite_song, ten_words, created_at})=>[user_id, spotify_id, slap, zest, stick, favourite_song, ten_words, created_at])
        )
        return db.query(insertReviewsDataQuery);
    })
}

module.exports = seed;