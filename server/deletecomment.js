const ObjectID = require('mongodb').ObjectID;



const add=(e,data,socket)=>{
    data.db().collection("comments").deleteOne(
        {_id:new ObjectID(e.id)},
        (error)=>{
            if(!error){
                data.db().collection('newshit').findOne({_id:
                    new ObjectID(e.questionid)},
                    (error,r)=>{
                      if(error){
                        console.log(error)
                      }else if(r){
                        data.db().collection('newshit').updateOne(
                          {_id:new ObjectID(e.questionid)}
                          ,{$set:{answers:r.answers-1}}
                            )
                socket.emit("commentdeleted")
            }
        })
    }}
    )}
    
module.exports=add