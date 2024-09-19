exports.sliceSpotifyIds = (arrOfIds)=>{
    if(arrOfIds.length < 21){
        return [arrOfIds.join(",")]
    }
    const masterArray = []
    for(let i = 0; i<arrOfIds.length/20; i++){
        const start = i*10;
        const end = (i+1)*10;
        masterArray.push(arrOfIds.slice(start,end))
    }
    if(arrOfIds.length%20 != 0){
        
        masterArray.push(arrOfIds.slice(arrOfIds.length - arrOfIds.length%20 ))
    }
    return masterArray.map((IdBatch)=>IdBatch.join(","))
    
}