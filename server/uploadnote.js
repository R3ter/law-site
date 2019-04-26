const fs=require('fs')
const path=require('path').join
const time=require('../time')
const mammoth=require('mammoth')


const succ=(e,data,socket)=>{


data.db().collection('notes-likes').findOne(
{name:e.notename},(error,r)=>{
    if(r){
        socket.emit('nameisused')
    }else if(!r&&!error){
        try{
    fs.appendFile(
        path(__dirname,'..',"rootnotes",e.notename+'.docx')
        ,e.file,()=>{
            try{
        mammoth.convertToHtml({path:path(__dirname,'..',"rootnotes"
        ,e.notename+'.docx')}).then(
            (result)=>{
                fs.appendFile(path(__dirname,'..',"notes"
                ,e.notename),result.value.replace(/<script/g,''),()=>{
                    data.db().collection('notes-likes').insertOne({
                        name:e.notename,likes:0,names:[],views:0,
                        poster:e.name,author:e.writer,description:e.description,
                        time:time()
                    },(error,r)=>{
                        if(!error,r){
                            socket.emit('notewasadded',e.notename)
                        }
                    })
                })
            }).catch((error)=>{socket.emit('fileisnotnote')
            fs.unlink(path(__dirname,'..',"rootnotes",e.notename+'.docx'),()=>{})
                })
    }catch(e){socket.emit('fileisnotnote')}
        })
    }catch(e){
        return console.log(e)
    }
        }
    })
    
}
    

module.exports=succ