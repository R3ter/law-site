
const add=(number,data,socket)=>{

if(number && typeof number.number != 'number'){number.number=1}
data.db().collection("newshit").find().toArray((error,r)=>{
  if(number.type=='Hot'){
      r=r.filter((e)=>{
          return(e.likesnames.length>=10||e.views>40)
      })
  }
   if(error){
     console.error(error)
     socket.emit("errorindatabase")
   }else{
     
     const defualt=r.reverse()
     try{
       if(number.text){
        r=r.filter((f)=>{
         return (((f.title).includes(number.text))
         |((f.tages).includes(number.text))|
         ((f.body).includes(number.text)))
       })
     }
     number.number<=0?number.number=1:number.number=number.number
     if(number.views){
       r.sort((a,b)=>{
         return b.views-a.views
       })
     }else if(number.likes){
       r.sort((a,b)=>{
         console.log(a)
         console.log(b.likesnames-b.dislikesnames.length
           -a.likesnames-a.dislikesnames.length)
        return ((b.likesnames.length-b.dislikesnames.length)
        -(a.likesnames.length-a.dislikesnames.length))
       })
     }else if(number.answers){
       r.sort((a,b)=>{
        return b.answers.length-a.answers.length
       })
     }else if(!number.text){
       r=defualt
     }
     socket.emit("db",{array:r.slice((number.number-1)*10,
       ((number.number)*10)),
       length:r.length})
     }
     catch(e){
       console.log(e)
     }
   }
 })
}


module.exports=add
