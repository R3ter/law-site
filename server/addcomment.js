const ObjectID = require('mongodb').ObjectID;
const time=require('../time')


function succ(props,data,socket){
let id
if(!props.text&&!typeof (props.text)=='string'){
  return
}
try{
   id=new ObjectID(props.id)
}catch(e){
  console.error(e)
}
data.db().collection('newshit').findOne({_id:id},
  (error,e)=>{
    if(error){
      console.log(error)
    }else if(e){
      data.db().collection('newshit').updateOne(
        {_id:id},{$set:{answers:e.answers+1}}
          )
          data.db().collection('accounts').findOne({username:props.name},
            (e,r)=>{
              if(!e&&r){
                try{
                  data.db().collection('comments').insertOne(
                  ({
                    id:props.id,
                    userid:r._id,
                    name:props.name,
                    time:time(),
                    text:props.text,
                    best:false,
                    likesnames:[],
                    dislikesnames:[]
                }),(error,r)=>{
                  if(r)
                  socket.emit('addcomment',r.ops[0])
                }
                )}
              catch(e){}
              }
    })              
    }
})
}

module.exports=succ