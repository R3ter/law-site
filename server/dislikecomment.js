const ObjectID = require('mongodb').ObjectID;
const updateclient=require('./checkcommentlikes')

const addlike=(id,data,socket)=>{
  if(ObjectID.isValid(id.id))
  data.db().collection('comments').findOne(
    {_id:new ObjectID(id.id)},(e,result)=>{
    if(e){
      console.error(e)
    }else if(result){
      if(!result.dislikesnames.includes(id.name)){
        data.db().collection('comments').updateOne({
        _id:new ObjectID(id.id)
      },{$set:{
        dislikesnames:result.dislikesnames.concat(id.name),
        likesnames:result.likesnames.filter((e)=>{return e!=id.name})
      }},()=>{
        updateclient(id,data,socket)
      })
      }else{
        data.db().collection('comments').updateOne({
          _id:new ObjectID(id.id)
        },{$set:{
          dislikesnames:result.dislikesnames.filter((s)=>{return s!=id.name})
        }},()=>{
          updateclient(id,data,socket)
        })
        }
    }
  })
}



module.exports=addlike