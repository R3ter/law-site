const fs=require('fs')
const path=require('path').join
const imagetype=require('image-type')


const succ=(e,data,socket)=>{
    if(e.content)
    if(imagetype(e.content)){
    if(e.content.byteLength<120000){
            data.db().collection('accounts').findOne({
            username:e.name
        },(error,result)=>{
            if(error) console.error(error)
            else{
                try{
                    fs.unlink(path(__dirname,'..',"profileimg",result._id+'.png'),
                    ()=>{
                        try{
                            fs.appendFile(
                                path(__dirname,'..',"profileimg",result._id+'.png')
                                ,e.content,(error)=>{
                                if(error){
                                    console.error(error)
                                }else{
                                    socket.emit('updated')
                                    console.log(e.name+' has uploaded his image')
                                }
                            })
                        }catch(e){
                            console.log(e)
                        }
                    })
                    }catch(e){console.log(e)}
            }

        })}
        
    }else{
        socket.emit('notimage')
    }
    
}

module.exports=succ