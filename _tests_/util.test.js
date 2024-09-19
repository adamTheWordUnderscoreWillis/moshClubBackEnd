const { sliceSpotifyIds } = require("../db/utils/spotifyIdUtils")

describe("UTIL TESTS",()=>{
    describe("sliceSpotifyIds",()=>{
        test ("When given less than 20 Ids, the function returns the ids as a single element in an array",()=>{
            const ids = ["1", "2","3","4"];
            const desiredOutput = ["1,2,3,4"];
            
            expect(sliceSpotifyIds(ids)).toEqual(desiredOutput)
        })
        test ("When given more than 20 Ids, the ids are split into blox of 20s",()=>{
            const ids = [];
            for(let i = 0; i<22; i++){
                ids.push(i.toString())
            }
            const desiredOutput = ["0,1,2,3,4,5,6,7,8,9","10,11,12,13,14,15,16,17,18,19", "20,21"];
            
            expect(sliceSpotifyIds(ids)).toEqual(desiredOutput)
        })
    })
})