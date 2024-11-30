const { sliceSpotifyIds, formatsHtmlQuery } = require("../db/utils/spotifyIdUtils")
const {chatScraper, postAlbumData} = require("../db/utils/scrapeChatUtil.js")

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
    describe("replace spaces with pluses", ()=>{
        test ("handles single word", ()=>{
            const singleWord = "bath"

            expect(formatsHtmlQuery(singleWord)).toBe(singleWord)
        })
        test ("handlesMultipleWords", ()=>{
            const words = "big old bag of stick insects"
            const wordsPlus = "big+old+bag+of+stick+insects"

            expect(formatsHtmlQuery(words)).toBe(wordsPlus)
        })
        test ("removes punctuation", ()=>{
            const cursedWords = "fishing!!"
            const cursedWordsPlus = "fishing"

            expect(formatsHtmlQuery(cursedWords)).toBe(cursedWordsPlus)
        })
    })
    describe("Chat Scraper", ()=>{
        test("Splits txt file into seperate chats", ()=>{
            // ARRANGE
            const expectedReview = `
                19/06/2024, 14:42:01] Luce: Reliqa - Secrets of the Future 

                SLAPPABILITY 
                🤘🤘🤘

                STICKINESS
                🤘🤘🤘🤘

                LYRICAL ZEST 
                🤘🤘🤘

                Favourite Song: Killstar

                10-word review: Huge Evanescence-like mystical hooks. Needs revisiting at the mixing desk.`
            chatScraper()
            // ASSERT
            .then((data)=>{
                expect(data).toEqual(expect.arrayContaining(expectedReview))
            })
            
        })
        test("Filters just Reviews format comments", ()=>{
            // ARRANGE
            const unexpectedMessage = `
                19/06/2024, 15:01:11] George: You’d die happy tho`
            chatScraper()
            // ASSERT
            .then((data)=>{
                expect(data).not.toEqual(expect.arrayContaining(expectedReview))
            })
            
        })
        test("Creates an object for each album", ()=>{
            // ARRANGE
            const expectedObject =
                {
                    name: "One More Time - Blink-182"
                }
            chatScraper()
            // ASSERT
            .then((data)=>{
                expect(data).toEqual(expect.arrayContaining(expectedObject))
            })
            
        })
    })
    describe.only("postAlbumData", ()=>{
        test("Get Object with Album ID in", ()=>{
            expect(postAlbumData()).toBe("Nice")
        })
    })
})