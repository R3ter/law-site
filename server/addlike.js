function addlike(e,data,socket){
    data.db().collection('notes-likes').findOne({name:e.note},
      (error,r)=>{
        if(error){
          console.log(error)
        }else if(r){
          if(!r.names.includes(e.name)){
            data.db().collection('notes-likes').updateOne(
              {name:e.note},{$set:{
                name:e.note,likes:r.likes+1,
                names:r.names.concat(e.name)}},
                (e,r)=>{
                  if(e){
                    socket.emit('addlike')
                  }else if(r){
                    socket.emit('addlike')
                  }else{
                    console.log('something went wrong')
                  }
                }
            )
          }else{
            data.db().collection('notes-likes').updateOne(
              {name:e.note},{$set:{
                name:e.note,likes:r.likes-1,
                names:r.names.filter((name)=>(name!=e.name))}},
                (e,r)=>{
                  if(e){
                    console.log(e)
                    socket.emit('deletelike')
                  }else if(r){
                    socket.emit('deletelike')
                  }else{
                    console.log('something went wrong')
                  }
                }
              
            )
          }
        }
      }
      )
  }

  module.exports=addlike