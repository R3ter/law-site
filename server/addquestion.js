const time=require('./../time')

const add=(e,data,socket)=>{
  data.db().collection('accounts').findOne({
    username:e.name
  },(error,r)=>{
    if(!error&&r){
    data.db().collection("newshit").insertOne(
        {name:e.name,
        userid:r._id,
        title:e.title,
        body:e.body,
        tages:e.tages,
        likesnames:[],
        dislikesnames:[],
        views:0,
        answers:0,
        date:time()}
      ).then(()=>{
      socket.emit("added","added")
        }).catch((error)=>{
      console.error("error\n"+error)
      })}
  })
}
module.exports=add