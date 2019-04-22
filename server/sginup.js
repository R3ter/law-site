const succ=(e,data,socket)=>{

    data.db().collection("accounts").findOne({username:e.username},
      (er,resulte)=>{
        if(er){
          console.log(er)
        }else{
          if(resulte==null){
            if(e.password.length>7&&e.username.length>4
              &&e.username.length<30){
              data.db().collection("accounts").insertOne({
                username:e.username,
                password:e.password,
                email:e.email
              }).then(()=>{
                socket.emit("signupsucc",e)
              }).catch((error)=>{
                socket.emit("signupfailed")
                console.log(error)
              })
            }else{
            socket.emit("sginupfaild")
            }
          }else{
            socket.emit("useralready")
          }
        }
    })
  }



module.exports=succ