const file=require('fs')
const path=require("path")

const add=(e,data,socket)=>{
    data.db().collection("notes-likes").deleteOne(
        {name:(e.note)},
        (error)=>{
            if(!error){
                try{
                    file.unlink(path.join(__dirname,'..','notes',e.note),(e)=>{
                        
                    })
                }catch(e){
                    console.log(e)
                }
            }
        }
    )}
    
module.exports=add