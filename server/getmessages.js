// const ObjectID = require('mongodb').ObjectID;

const addlike=(e,data,socket)=>{
data.db().collection("chat").find().toArray((error,r)=>{
    if(error){
        throw error
    }else if(r){
        socket.emit("getmessages",{
            messages:r.filter((r)=>{
                if(r.user==e.name|r.user2==e.name)
               return r
            })
        })
    }
})
}


module.exports=addlike