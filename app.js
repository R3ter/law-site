const http=require("http")
const path=require("path")
const getnote=require('./server/getnote')
const getlaw=require('./server/getlaw')
// const bodyParser=require("body-parser")
const express=require('express')
const file=require('fs')
const profileinfo=require('./server/profileinfo')
const signin=require('./server/signin')
const signup=require('./server/sginup')
const removenote=require('./server/removenote')
const addnote=require('./server/uploadnote')
const getmessages=require('./server/getmessages')
const getchat=require('./server/getchat')
const ask=require('./server/addquestion')
const addlikequestion=require('./server/addlikequestion')
const app=express()
const upload=require('./server/uploadimg')
const adddislikequestion=require('./server/dislikequestion')
const addlike= require('./server/addlike')
const addcomment= require('./server/addcomment')
const getQuestions=require('./server/getQuestions')
const deletecomment= require('./server/deletecomment')
const ObjectID = require('mongodb').ObjectID;
const deletequestion=require('./server/deletequestion')
const best=require('./server/bestanswer')
const server=http.createServer(app)
const addlikecomment=require('./server/addlikeanswer')
const dislikecomment=require('./server/dislikecomment')
const islogged=require('./server/islogged')
const mongoconnect = require('./database')
const socket=require('socket.io')(server)





app.use(express.static(path.join(__dirname,"public")))
let id;
app.get('*',(req,res)=>{
  id=req.ip
  if(req.ip)
    res.sendFile(path.join(__dirname,"public",'index.html'))
  });
mongoconnect((data)=>{
  server.listen(process.env.PORT||3000);


socket.on('connect',(socket)=>{
  // console.log("connected")
  socket.on('getlaws',(e)=>{
    try{
      file.readdir(path.join(__dirname,'files'),(error,array)=>{
        if(!error){
          if(e){
            socket.emit('getlaws',array.filter((a)=>{
              return(a.includes(e))
            }))
          }else{
            socket.emit('getlaws',array)
          }
        }
      })
    }
    catch(e){console.log(e)}
  })
  socket.on('file',(e)=>{
    try{
      file.readFile(path.join(__dirname,'files',e),"utf8",
      (e,r)=>{
        if(e){
          socket.emit('fileError')
        }else{
          socket.emit('file',r)
        }
      })
    }
     catch(error) {
      console.error(error);
    }
  })
  
  getnote(data,socket)
  getlaw(data,socket)

  socket.on('gettime',()=>{
    const date=new Date()
    socket.emit('gettime',{
      getfullyear:date.getFullYear(),
      getfullmonth:date.getMonth()+1,
      getday:date.getDate(),
      gethours:date.getHours(),
      getmins:date.getMinutes()
    })
  })


  socket.on("removenote",(e)=>{
    if(e.name=='adminwaleedisadmin'){
      islogged(e,data,removenote,socket)
    }
  })

  socket.on('addview',(e)=>{

    data.db().collection('notes-likes').findOne({name:e},
      (error,r)=>{
        if(error){
          console.log(error)
        }else if(r){
          try{
            data.db().collection('notes-likes').updateOne(
              {name:e},{$set:{
                name:e,likes:r.likes,views:r.views+1,
                names:r.names.filter((name)=>(name!=e.name))}}
                )
          }
          catch(e){
            console.log("cant find note")
          }
      }
    })
})


socket.on('report',(e)=>{
data.db().collection('report').findOne({
  link:e.link
},(error,result)=>{
  if(result&&!error){
    if(!result.names.includes(e.name)){
      data.db().collection('report').updateOne({
    link:e.link
      },{$set:{names:result.names.concat(e.name)}})
    }
  }else if(!result){
    data.db().collection('report').insertOne({
      link:e.link,names:[e.name]
    })
  }
})
})

socket.on('getreports',(e)=>{
  if(e.name=='adminwaleedisadmin')
  islogged(e,data,()=>{
    data.db().collection('report').find().toArray((error,result)=>{
      socket.emit('getreports',result)
    })
  },socket)  
})
socket.on('deletereport',(e)=>{
  if(e.name=='adminwaleedisadmin'){
    islogged(e,data,()=>{
      data.db().collection('report').deleteOne({
        _id:ObjectID(e.id)
      })
    },socket)
  }
})
socket.on('deletereportcomment',(e)=>{
  if(e.name=='adminwaleedisadmin'){
    islogged(e,data,()=>{
      data.db().collection('reportedcomments').deleteOne({
        _id:ObjectID(e.id)
      })
    },socket)  
  }
})
socket.on('reportquestion',(e)=>{
  console.log(e)
  data.db().collection('reportedquestions').findOne({
   questionid:e.questionid
  },(error,result)=>{
    console.log(result)
    if(result&&!error){
      if(!result.names.includes(e.username)){
        data.db().collection('reportedquestions').updateOne({
        questionid:e.questionid      
        },{$set:{names:result.names.concat(e.username)}})
      }
    }else if(!result){
      data.db().collection('reportedquestions').insertOne({
        questionid:e.questionid,names:[e.username]
      })
    }
  })
  })
socket.on("signin",(e)=>{
  signin(e,data,socket)
})
socket.on("getuserinfo",(e)=>{
  profileinfo(e,data,socket)
})
socket.on('signup',(e)=>{
  signup(e,data,socket)
})
socket.on('deletequestion',(e)=>{
  if(e.name=='adminwaleedisadmin'){
    islogged(e,data,deletequestion,socket)
  }else
  data.db().collection('newshit').findOne({_id:new ObjectID(e.id),
      name:e.name},(error,r)=>{
      if(error) console.error(error)
      else if(r){
        if(r.answers<1)
        islogged(e,data,deletequestion,socket)
        else{
          socket.emit('cantdelete')
        }
      }else{
        console.log('not logged')
      }
    })
})
socket.on("addnote",(e)=>{
  islogged(e,data,addnote,socket)
})
socket.on("uploadimg",(e)=>{
    islogged(e,data,upload,socket)
})
socket.on("setbest",(e)=>{
  data.db().collection('newshit').findOne({
  name:e.name},(error,r)=>{
    if(error) console.error(error)
    else if(r){
      islogged(e,data,best,socket)
    }else{
      console.log('not logged')
    }
  })
})

socket.on("getaccounts",(e)=>{
  islogged(e,data,()=>{
    data.db().collection("accounts").find().toArray((error,r)=>{
      if(!error&&r){
        r.filter((r)=>{
          try{
            return !r.bans.includes(e.name)
          }catch(e){return true}
        })
        socket.emit('getaccounts',r.map((r)=>{
          return r.username
        }))
      }
    })
  },socket)
})
socket.on("getmessages",(e)=>{
  islogged(e,data,getmessages,socket)
})
// socket.on("getchat",(e)=>{
//   islogged(e,data,getchat,socket)
// })
socket.on("addquestion",(e)=>{
  islogged(e,data,ask,socket)
})
socket.on("addlikequestion",(e)=>{
  islogged(e,data,addlikequestion,socket)
})
socket.on("deletecomment",(e)=>{
  if(e.name=='adminwaleedisadmin'){
    islogged(e,data,deletecomment,socket)
  }else{
    data.db().collection('comments').findOne({
      name:e.name,_id:ObjectID(e.id)
    },(error,result)=>{
      if(!error,result){
        islogged(e,data,deletecomment,socket)
      }
    })
  }
})
socket.on('adddislikequestion',(e)=>{
  islogged(e,data,adddislikequestion,socket)
 })
  socket.on('addlikecomment',(e)=>{
   islogged(e,data,addlikecomment,socket)
  })
  socket.on('dislikecomment',(e)=>{
    islogged(e,data,dislikecomment,socket)
          })
  socket.on('addcomment',(e)=>{
   islogged(e,data,addcomment,socket)
  })
  socket.on('addlike',(e)=>{
    islogged(e,data,addlike,socket)
     })
 socket.on('addviewquestion',(e)=>{
   if(ObjectID.isValid(e)){
     try{
      e=new ObjectID(e)
    }
    catch(e){
      socket.emit("notfound")
    }
  data.db().collection('newshit').findOne({_id:e},
    (error,r)=>{
      if(error){
        console.log(error)
      }else if(r){
  data.db().collection('newshit').updateOne(
    {_id:e},{$set:{views:r.views+1}}
      )
    }
  })
}})
socket.on('getcomments',(id)=>{
  if(ObjectID.isValid(id)){
    try{
  id=new ObjectID(id)}
  catch(e){
    socket.emit('getcomments',[])
  }
  data.db().collection("comments").find().toArray((e,files)=>{
    socket.emit('getcomments',files.reverse().filter((e)=>{
      return id==e.id
    })
  )
})
}else{
  socket.emit('getcomments',[])
}
})
socket.on("getnoteinfo",(e)=>{
  data.db().collection("notes-likes").findOne({
    name:e
  },(e,r)=>{
    if(!e&&r){
      socket.emit("getnoteinfo",{
        name:r.name,author:r.author,
        description:r.description,
        likes:r.likes,poster:r.poster,
        views:r.views,time:r.time
      })
    }else{
      socket.emit("noteinfowasnotfound")
    }
  })
})
 

  socket.on('islikedquestion',(e)=>{
    if(ObjectID.isValid(e.id)){
      e.id=new ObjectID(e.id)
    }
    data.db().collection('newshit').findOne({_id:e.id},
      (error,r)=>{
        if(error){
          console.log(error)
        }else if(r){
          try{
            if(r.likesnames.includes(e.name)){
              socket.emit('islikedquestion')
            }else{
              socket.emit('isnotlikedquestion')
            }
          }catch(e){console.timeLog(e)}
        }
        
      })
  })
  socket.on('checklikes',(props)=>{
    try{
      id=new ObjectID(props.id)
    data.db().collection('newshit').findOne({_id:id},(e,r)=>{
      if(!e&&r)
      try{
        if(r.likesnames.includes(props.name)){
        socket.emit('checklikes',
        {likes:r.likesnames.length-r.dislikesnames.length
        ,liked:true})}
        else if(r.dislikesnames.includes(props.name)){
          socket.emit('checklikes',
          {likes:r.likesnames.length-r.dislikesnames.length
          ,disliked:true})
        }else{
          socket.emit('checklikes',
          {likes:r.likesnames.length-r.dislikesnames.length})
        }
      }catch(e){console.log(e)}
    })}
    catch(e){}
  })

  socket.on('isdislikedquestion',(e)=>{
    if(ObjectID.isValid(e.id)){
      e.id=new ObjectID(e.id)
    }
    data.db().collection('newshit').findOne({_id:e.id},
      (error,r)=>{
        try{
          if(error){
            console.log(error)
          }else if(r){
            if(r.dislikesnames.includes(e.name)){
              socket.emit('isdislikedquestion')
            }else{
              socket.emit('isnotdislikedquestion')
            }
          }
        }catch(e){console.log(e)}
        
      })
  })
  socket.on('isliked',(e)=>{
    try{
      data.db().collection('notes-likes').findOne({name:e.note},
        (error,r)=>{
          if(error){
            console.log(error)
          }else if(r){
            if(r.names.includes(e.name)){
              socket.emit('isliked')
            }else{
              socket.emit('isnotliked')
            }
          }
          
        })
    }catch(e){console.log(e)}
  })
  
          

  socket.on("db",(number)=>{
    getQuestions(number,data,socket)
  })


  socket.on("signout",(e)=>{
    islogged(e,data,()=>{
      data.db().collection("login").deleteOne({
      _id:new ObjectID(e.ider)})
    },socket)
    socket.emit("signedout")
  })

  /////


    
    
    socket.on('dbOne',(id)=>{
      if(ObjectID.isValid(id)){
        data.db().collection("newshit").findOne({_id:new ObjectID(id)}
        ,(e,suc)=>{
          if(e){
            socket.emit("notfind")
          }else{
            socket.emit("dbOne",suc)
          }
  
        })
      }
    })
    
  })
}) 

// app.use(bodyParser())


