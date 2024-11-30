
-- \c mosh_club_test

-- -- CREATE TABLE albums (
-- --                 album_id SERIAL PRIMARY KEY,
-- --                 spotify_id VARCHAR NOT NULL,
-- --                 album_name VARCHAR NOT NULL,
-- --                 artist_name VARCHAR NOT NULL,
-- --                 user_id INT,
-- --                 slap DECIMAL(2,1) DEFAULT 0,
-- --                 zest DECIMAL(2,1) DEFAULT 0,
-- --                 stick DECIMAL(2,1) DEFAULT 0,
-- --                 score DECIMAL(2,1) DEFAULT 0,
-- --                 review_count INT DEFAULT 0
-- --                 );

-- -- select * FROM albums;

-- SELECT *,
--     SUM(zest + slap + stick) AS score,
--     CASE WHEN review_count=0 THEN 0
--          ELSE CAST(zest/(review_count*5.0)*100 AS int)
--     END AS zest_percent,
--     CASE WHEN review_count=0 THEN 0
--          ELSE CAST(slap/(review_count*5.0)*100 AS int)
--     END AS slap_percent,
--     CASE WHEN review_count=0 THEN 0
--          ELSE CAST(stick/(review_count*5.0)*100 AS int)
--     END AS stick_percent,
--     CASE WHEN review_count=0 THEN 0
--          ELSE CAST((zest+slap+stick)/(review_count*15.0)*100 AS int)
--     END AS overall_percent  

-- FROM albums
-- GROUP BY albums.album_id
-- ORDER BY overall_percent DESC;

\c mosh_club

SELECT * FROM albums