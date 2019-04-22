const mongodb =require('mongodb')
const mongoclient=mongodb.MongoClient;



const mongoConnect=(callback)=>{
    
    mongoclient.connect("mongodb+srv://waleed:waleed23@cluster0-kw0te.mongodb.net/test?retryWrites=true"
    )
    .then((client)=>{
        callback(client)
        console.log('connection is complete')
      
    }).catch((e)=>{
        console.error('error with datatbase\n'+e)
    })
}

module.exports=mongoConnect