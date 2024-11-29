// PSUEDO CODE - What does this need to do?
// It splits the chat to all messages.
//Then it filters only the reviews.
// Then it creates creates an obect that counts te reviews.
// Turns that object into the reviewdata
const fs = require("fs/promises");

exports.chatScraper = ()=> {
    const titleRegex = /: [a-zA-Z0-9 ]*-*/g
    const dateRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}, [0-9]{2}:[0-9]{2}:[0-9]{2}/g
    const reviewerRegex = /[A-Za-z0-9 ]*:/g
        return fs.readFile("./db/data/development-data/_chat.txt", "utf-8")
         .then((data)=>{

            const arrayOfReviews =  data.split("[").filter((message)=> message.toLowerCase().includes("slappability"))
            const reviewObjects = arrayOfReviews.map((review)=> {
                return {
                    name: review.match(titleRegex)[0].toLowerCase(),
                    date: review.match(dateRegex)[0],
                    reviewer: review.match(reviewerRegex)[2]                }
            })
            console.log(reviewObjects)
             return arrayOfReviews
         })
}

exports.postAlbumData = ()=> {
    
}