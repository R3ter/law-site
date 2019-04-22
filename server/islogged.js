const ObjectID = require('mongodb').ObjectID;
const time=require('./../time')


const islogged=(e,data,callback,socket)=>{
    if(ObjectID.isValid(e.ider)){
        data.db().collection("login").find({_id:new ObjectID(e.ider),
        username:e.name,id:e.pass}).toArray(
        (eror,result)=>{
            if(eror){
                socket.emit("notloged")
            }
            if(result.length>0){
                data.db().collection("accounts").updateOne({
                    username:e.name
                },{$set:{last:time()}})
                callback(e,data,socket)
            return true
        }else{
        socket.emit("notloged")
        }
        })
    }else{
        socket.emit("notloged")
    }
}
module.exports=islogged