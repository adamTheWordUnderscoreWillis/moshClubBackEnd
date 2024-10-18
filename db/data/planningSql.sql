-- \c mosh_club_test

-- DROP TABLE IF EXISTS reviews;
-- DROP TABLE IF EXISTS albums;
-- DROP TABLE IF EXISTS users;


-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     user_name VARCHAR NOT NULL
-- );

-- CREATE TABLE albums (
--     album_id SERIAL PRIMARY KEY,
--     album_name VARCHAR NOT NULL,
--     artist_name VARCHAR NOT NULL,
--     album_image_url VARCHAR,
--     user_id INT,
--     FOREIGN KEY (user_id) REFERENCES users(user_id),
--     slap INT DEFAULT 0,
--     zest INT DEFAULT 0,
--     stick INT DEFAULT 0,
--     score INT DEFAULT 0,
--     review_count INT DEFAULT 0
-- );

-- CREATE TABLE reviews (
--     review_id SERIAL PRIMARY KEY,
--     user_id INT,
--     FOREIGN KEY (user_id) REFERENCES users(user_id),
--     album_id INT,
--     FOREIGN KEY (album_id) REFERENCES albums(album_id),
--     slap INT DEFAULT 0,
--     zest INT DEFAULT 0,
--     stick INT DEFAULT 0,
--     favourite_song VARCHAR,
--     ten_Words VARCHAR,
--     created_At TIMESTAMP DEFAULT NOW()
-- );


-- INSERT INTO users (user_name)
-- VALUES
-- ('Fin'),
-- ('Adam');

-- INSERT INTO albums (album_name, artist_name, user_id)
-- VALUES
-- ('Rock CD', 'Liz', 1),
-- ('Jump', 'Van Halen',2);


-- INSERT INTO reviews (user_id, album_id, slap, zest, stick)
-- VALUES
-- (1,1,1,1,1),
-- (2,2,4,3,5),
-- (1,2,4,3,5),
-- (2,1,5,5,5);

-- select users.user_name, albums.album_name, reviews.slap FROM reviews
-- INNER JOIN users
-- ON reviews.user_id = users.user_id
-- INNER JOIN albums
-- ON reviews.album_id = albums.album_id;

-- select SUM(slap) FROM reviews
-- WHERE album_id = 1;

-- select * FROM albums;

\c mosh_club_test

select *,

    CASE WHEN review_count=0 THEN 0
         ELSE CAST(zest/(review_count*5.0)*100 AS int)
    END AS zest_percent,
    CASE WHEN review_count=0 THEN 0
         ELSE CAST(slap/(review_count*5.0)*100 AS int)
    END AS slap_percent,
    CASE WHEN review_count=0 THEN 0
         ELSE CAST(stick/(review_count*5.0)*100 AS int)
    END AS stick_percent,
    CASE WHEN review_count=0 THEN 0
         ELSE CAST(score/(review_count*15.0)*100 AS int)
    END AS overall_percent  

FROM albums;
