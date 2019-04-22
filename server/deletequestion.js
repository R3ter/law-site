const ObjectID = require('mongodb').ObjectID;



const add=(e,data,socket)=>{
    data.db().collection("newshit").deleteOne(
        {_id:new ObjectID(e.id)},
        (error)=>{
            if(!error){
    data.db().collection("comments").deleteMany({
        id:e.id
    })
                socket.emit("deleted")
            }
    })
}
module.exports=add