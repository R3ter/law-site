const ObjectID=require('mongodb').ObjectID

const updateclient=(id,data,socket)=>{
    data.db().collection('comments').findOne({
      _id:new ObjectID(id.id)
    },(e,r)=>{
      if(r.likesnames.includes(id.name)){
        socket.emit('changecommentlikes',
        {likes:r.likesnames.length,
          dislikes:r.dislikesnames.length,
          liked:true,id:id.id})
      }else if(r.dislikesnames.includes(id.name)){
        socket.emit('changecommentlikes',{likes:r.likesnames.length,
          dislikes:r.dislikesnames.length,
          disliked:true,id:id.id})
      }else{
        socket.emit('changecommentlikes',{
          likes:r.likesnames.length,
          dislikes:r.dislikesnames.length,id:id.id})
      }
    })
    }

module.exports=updateclient
