const ObjectID = require('mongodb').ObjectID;
const updateclient=require('./checkcommentlikes')

const addlike=(id,data,socket)=>{
  if(ObjectID.isValid(id.id))
  data.db().collection('comments').findOne(
    {_id:new ObjectID(id.id)},(e,result)=>{
    if(e){
      console.error(e)
    }else if(result){
      if(!result.likesnames.includes(id.name)){
        data.db().collection('comments').updateOne({
        _id:new ObjectID(id.id)
      },{$set:{
        likesnames:result.likesnames.concat(id.name),
        dislikesnames:result.dislikesnames.filter((e)=>{return e!=id.name})
      }},()=>{
        updateclient(id,data,socket)
      })
      }else{
        data.db().collection('comments').updateOne({
          _id:new ObjectID(id.id)
        },{$set:{
          likesnames:result.likesnames.filter((s)=>{return s!=id.name})
        }},()=>{
          updateclient(id,data,socket)
        })
        }
    }
  })
}
module.exports=addlike