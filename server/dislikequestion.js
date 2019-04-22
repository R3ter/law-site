const ObjectID = require('mongodb').ObjectID;

const addlike=(id,data,socket)=>{

  if(ObjectID.isValid(id.id))
  data.db().collection('newshit').findOne(
    {_id:new ObjectID(id.id)},(e,result)=>{
    if(e){
      console.error(e)
    }else if(result){
      if(!result.dislikesnames.includes(id.name)){
        data.db().collection('newshit').updateOne({
        _id:new ObjectID(id.id)
      },{$set:{
        dislikesnames:result.dislikesnames.concat(id.name)
      }},()=>{
        if(result.likesnames.includes(id.name)){
          data.db().collection('newshit').updateOne({
            _id:new ObjectID(id.id)
          },{$set:{
            likesnames:result.likesnames.filter((e)=>{return e!=id.name})
          }},()=>{
            socket.emit('donedislike')
          })
        }else{
          socket.emit('donedislike')
        }
      })

      }else{
        data.db().collection('newshit').updateOne({
          _id:new ObjectID(id.id)
        },{$set:{
          dislikesnames:result.dislikesnames.filter((s)=>{return s!=id.name})
        }},()=>{
          socket.emit('donedislike')
        })
        }
    }
  })
}
module.exports=addlike