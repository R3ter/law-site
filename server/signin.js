const uniqid=require('uniqid')
const time=require('./../time')

const succ=(e,data,socket)=>{
data.db().collection("accounts").findOne({username:e.username},
    (er,resulte)=>{
      if(er){
        console.log(er)
      }else{
        if(resulte!=null){
          if(e.password===resulte.password){
            data.db().collection('login').findOne({username:e.username},
              (error,result)=>{
                if(error){
                  throw error
                }else if(result){
                  data.db().collection('login').updateOne({
                    username:e.username
                  },{$set:{id:uniqid()}},(error)=>{
                    if(error) throw error
                    data.db().collection('login').findOne({username:e.username},
                      (error,result)=>{
                        if(error) console.error(error)
                        
                        data.db().collection("accounts").updateOne({
                          username:e.username
                          },{$set:{last:time()}})

                        console.log(e.username+' has logged in')
                        socket.emit('loggedin',
                        {id:result._id,
                        ider:resulte._id,
                        username:e.username,
                        pass:result.id})
                    })
                  })
                }else{
                  data.db().collection('login').insertOne({
                    username:e.username,
                    password:e.password,
                    id:uniqid()
                  },(error,result)=>{
                    if(error) throw error
                    else{
                    
                    data.db().collection("accounts").updateOne({
                      username:e.username
                  },{$set:{last:time()}})

                      console.log(e.username+'has logged in again')

                      socket.emit('loggedin',
                      {id:result.ops[0]._id,
                        ider:resulte._id,
                      username:e.username,
                      pass:result.ops[0].id})
                    }
                  })
                }
              })        
          }else{socket.emit('wrongpass')}
        }else{socket.emit('wrongusername')} 
      }  
    }
  )
}


module.exports=succ