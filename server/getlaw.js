const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path=require("path")
const file=require('fs')


function waleed(data,socket){

  socket.on("find-law",(e)=>{
    try{
      file.readFile(path.join(__dirname,'..','files',e.name),
      (error,dom) => {

          try{
            socket.emit('law-was-found',
            {text:dom}
            )
          }catch(e){console.log(e)}
        })
    }
    catch(e){
      console.log(e)
      socket.emit('law-was-notfound')
    }
      

  })
}

module.exports=waleed