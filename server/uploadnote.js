const fs=require('fs')
const path=require('path').join
const jsdom = require("jsdom");
const time=require('../time')
const { JSDOM } = jsdom;

const succ=(e,data,socket)=>{
    data.db().collection('notes-likes').findOne(
        {name:e.notename},(error,r)=>{
            if(r){
                socket.emit('nameisused')
            }else if(!r&&!error){
                try{

                if(
                     new JSDOM(e.file)
                .window.document.body.children[0]
                .children[2]
                 )
                data.db().collection('notes-likes').insertOne({
                    name:e.notename,likes:0,names:[],views:0,
                    poster:e.name,author:e.writer,description:e.description,
                    time:time()
                },(error)=>{
                    if(!error){
                        try{
                            
                           new JSDOM(e.file)
                           .window.document.body.children[0]
                           .children[4]
                           
                        fs.appendFile(
                            path(__dirname,'..',"notes",e.notename)
                            ,e.file,()=>{
                                socket.emit('notewasadded',e.notename)
                            })
                        }catch(e){
                            return console.log(e)
                        }
                    }
                })
                else{
                    socket.emit('fileisnotnote')
                }
            }
            catch(e){
                
            }
        }
    })
}
    

module.exports=succ