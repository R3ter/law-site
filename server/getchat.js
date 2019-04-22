
const addlike=(e,data,socket)=>{
    console.log(e)
    data.db().collection("chat").findOne({user:e.name},(error,r)=>{
        if(error){
            throw error
        }else if(r){
            socket.emit("getchat",r)
        }else{
    data.db().collection("chat").findOne({user2:e.name},(error,r)=>{
        if(error){
            throw error
        }else if(r){
            socket.emit("getchat",r)
        }else{
            socket.emit("getchat",{})
        }
    })
}
})
}
    
    
    module.exports=addlike