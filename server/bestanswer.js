const ObjectID = require('mongodb').ObjectID;


const add=(e,data,socket)=>{
    try{
        e.id=new ObjectID(e.id)
        data.db().collection("newshit").updateOne({
            _id:e.id
        },{$set:{best:e.commentid,answerer:e.name}},(error)=>{
            if(!error)
            socket.emit("updatedbest",e.commentid)
        })
    }
    catch(e){
        return
    }
}
module.exports=add