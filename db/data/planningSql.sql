
\c mosh_club_test

select * FROM albums;

-- select *,

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
--          ELSE CAST(score/(review_count*15.0)*100 AS int)
--     END AS overall_percent  

-- FROM albums;
