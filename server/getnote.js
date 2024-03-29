const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path=require("path")
const fs =require('fs')


function waleed(data,socket){

socket.on("notes-files",(r)=>{
    data.db().collection("notes-likes").find().toArray((e,files)=>{
      if(e){
        console.error(e)
        socket.emit('notes-files-notfound')
        return
      }else{
        const purefiles=files.reverse()
        socket.on('search-notes',(e)=>{
          try{
          let newarray=files.filter((f)=>{
            return ((f.name).includes(e))
          })
          const purenewarry=newarray.reverse()
          if(e.views){
            newarray.sort((a,b)=>{
              return b.views-a.views
            })}else if(e.likes){
              newarray.sort((a,b)=>{
              return b.likes-a.likes
            })
          }else{
            newarray=purenewarry
          }
          socket.emit('search-notes',newarray.slice(0,50))
           }catch(e){console.log(e)}
        })
        if(r.views){
        files.sort((a,b)=>{
          return b.views-a.views
        })}else if(r.likes){
        files.sort((a,b)=>{
          return b.likes-a.likes
        })
      }else{
        files=purefiles
      }
      
        socket.emit('notes-files',{
          array:files.slice((r.number-1)*20,r.number*20),
          length:files.length/20})
          
        }
        
      })
    })
  socket.on("find-note",(e)=>{
    try{
      fs.readFile(path.join(__dirname,'..','notes',e.name),'utf8'
      ,(error,dom) => {
        const elements=new JSDOM(dom).window.document.children[0].
        children[1].children
        const result = Object.keys(elements).map(function(key) {
            return elements[key].outerHTML.
            replace(/<img/g,'<img style="max-width:700;max-height:500" ')
        });
        if(e.nopages){
          try{
            socket.emit('note-was-found',
            {text:result
              }
              )
          }catch(e){
      socket.emit('note-was-notfound')
      }
        }else{
          try{
            socket.emit('note-was-found',
            {text:result.slice((e.num-1)*20,e.num*20)
              ,pages:result[1]?true:false,
              length:result.length/20}
              )
          }catch(e){
      socket.emit('note-was-notfound')
            }
        }
        })
    }
    catch(e){
      
      socket.emit('note-was-notfound')
    }
      

  })
}

module.exports=waleed