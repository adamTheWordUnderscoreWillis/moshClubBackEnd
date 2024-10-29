const format = require("pg-format")
const fs = require("fs/promises")
const db = require("../../db/index")

exports.addNewReview = (review)=>{
    const {user_id, spotify_id, slap, zest, stick, favourite_song, ten_words} = review

    const albumQueryStatement = `
    SELECT * FROM albums`

    const insertReviewQuerySrt = format( `
        INSERT INTO reviews
        (user_id, spotify_id, slap, zest, stick, favourite_song, ten_words)
        VALUES
        (%L) RETURNING*;`, [user_id, spotify_id, slap, zest, stick, favourite_song, ten_words]
    )

    const getAlbumData =  db.query(albumQueryStatement)
    .then(({rows})=>{
        const albumsData = rows
        return albumsData
    })

    const postReviewQuery = db.query(insertReviewQuerySrt)
    .then(({rows})=>{
        const review = rows[0]
        return review
    })

    return Promise.all([getAlbumData, postReviewQuery])
    .then(([albumsData,review])=>{
        const {slap, zest, stick, spotify_id} = review

        const targetedAlbum = albumsData.filter((album)=> album.spotify_id === spotify_id)[0]

        const reviewCountTotal = targetedAlbum.review_count + 1
        const slapTotal = targetedAlbum.slap + slap
        const zestTotal = targetedAlbum.zest + zest
        const stickTotal = targetedAlbum.stick + stick
        const scoreTotal = targetedAlbum.score + slap + zest + stick

        const updateAlbumsQueryStatement =`
        UPDATE albums 
        SET slap = $1, 
        zest = $2, 
        stick = $3, 
        score = $4, 
        review_count = $5
        WHERE spotify_id = $6;`

        
        const updateAlbumsQueryValues = [slapTotal, zestTotal, stickTotal, scoreTotal, reviewCountTotal,spotify_id]
        
        db.query(updateAlbumsQueryStatement, updateAlbumsQueryValues)
        return review
        
    })
    .then((newReview)=>{
        return newReview
    })

}

exports.checkReviewIdExists =(review_id)=>{
    const queryStatment = `
    SELECT * FROM reviews
    WHERE review_id = $1`
    return db
    .query(queryStatment, [review_id])
    .then(({rows})=> {
        if(rows.length === 0){
                return Promise.reject({
                    status: 404,
                    msg: `Review ${review_id} does not exist.`
                })
        }

    })
}
exports.fetchAllReviewsByAlbumID =(spotify_id)=>{
    const queryStatment = `
    SELECT * FROM reviews
    WHERE spotify_id = $1`
    return db
    .query(queryStatment, [spotify_id])
    .then(({rows})=> {
        return rows;
    })
    .catch((err)=> console.log(err))
}
exports.deleteReviewById = (review_id)=>{
    const deleteQueryStatment = `
    DELETE FROM reviews
    WHERE review_id = $1;`

    const albumQueryStatement = `
    SELECT * FROM albums`

    const getAlbumData =  db.query(albumQueryStatement)
    .then(({rows})=>{
        const albumsData = rows
        return albumsData
    })

    const reviewQueryStatement = `
    SELECT * FROM reviews
    WHERE review_id = $1;
    `
    const fetchReviwByIDQuery = db.query(reviewQueryStatement, [review_id]).then(({rows})=>{
        return rows[0]
    })

    return Promise.all([fetchReviwByIDQuery, getAlbumData]).then(([review, albumsData])=>{
        const {slap, zest, stick, spotify_id} = review

        const targetedAlbum = albumsData.filter((album)=> album.spotify_id === spotify_id)[0]


        const reviewCountTotal = targetedAlbum.review_count - 1
        const slapTotal = targetedAlbum.slap - slap
        const zestTotal = targetedAlbum.zest - zest
        const stickTotal = targetedAlbum.stick - stick
        const scoreTotal = targetedAlbum.score - (slap + zest + stick)

        const updateAlbumsQueryStatement =`
        UPDATE albums 
        SET slap = $1, 
        zest = $2, 
        stick = $3, 
        score = $4, 
        review_count = $5
        WHERE spotify_id = $6;`

        
        const updateAlbumsQueryValues = [slapTotal, zestTotal, stickTotal, scoreTotal, reviewCountTotal,spotify_id]

        return db.query(updateAlbumsQueryStatement, updateAlbumsQueryValues)
    })
    .then(()=>{
        return db.query(deleteQueryStatment, [review_id])
    })

}