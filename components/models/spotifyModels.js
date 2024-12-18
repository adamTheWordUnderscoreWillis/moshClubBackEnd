const axios = require("axios")
const fs = require("fs/promises")

const clientId = process.env.client_id
const clientSecret = process.env.client_secret
const spotifyUrl = axios.create({
     baseURL: "https://accounts.spotify.com/",
     headers: {
         "Content-Type": "application/x-www-form-urlencoded"
     }
})
exports.fetchAuthorisationToken = ()=> {
    const options = {
        'client_id' : clientId,
        'client_secret' : clientSecret,
        'grant_type' : "client_credentials"
    }
    return spotifyUrl
    .post("/api/token", options)
    .then(({data})=>{
        return data
    })
}

