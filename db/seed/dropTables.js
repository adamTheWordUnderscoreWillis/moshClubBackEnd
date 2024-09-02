const db = require('../index');

exports.dropTables = () => {
    return db
    .query(`DROP TABLE IF EXISTS reviews;`)
    .then(()=>{
        return db.query(`DROP TABLE IF EXISTS albums;`)
    })
    .then(()=>{
       return  db.query(`DROP TABLE IF EXISTS users`)
    })
}