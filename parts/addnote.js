import React from 'react'
import getCookie from './getcookie'
import io from 'socket.io-client'
import { show, hide } from './loading';
import info from './info';
import Confirm from './confirm';
const socket=io()
const reader  = new FileReader();

const upload=()=>{
    show()

    const error=document.getElementById('error');
  const file=document.getElementById('note-file').files[0]
  const name=document.getElementById('note-name').value
  const writer=document.getElementById('note-author').value
  const description=document.getElementById('note-description').value
  if(!file){
      hide()
      document.getElementById('note-file').style.borderColor='red'
    error.innerHTML='please select a file'
  }else if(name.length>30){
    hide()
    document.getElementById('note-name').style.borderColor='red'
    error.innerHTML='name is too long'
}
else if(name.length<10){
  hide()
  document.getElementById('note-name').style.borderColor='red'
  error.innerHTML='name is too short'
}
  else if(!name||name==''){
      hide()
      document.getElementById('note-name').style.borderColor='red'
      error.innerHTML='please type the file name'
  }else if(!description||description==''){
      hide()
      document.getElementById('note-description').style.borderColor='red'
      error.innerHTML='please type the file description'
  }else if(writer==''){
    hide()
    document.getElementById('note-author').style.borderColor='red'
    error.innerHTML='please type author name'
  }else{
    hide()
      if(file.name.split('.').pop()=='docx'){
          reader.readAsText(file)
          reader.onload=(e)=>{
            Confirm('are you sur you want to upload this',
            'you cant delete it once you have click yes',()=>{
              show()
              socket.emit('addnote',{
                  notename:name,description:description,file:file,
                  name:getCookie("Username"),
                  writer:writer
                ,ider:getCookie("id"),
                pass:getCookie("pass")
              })    
            },()=>{
              hide()
            })
          }
    
      }else{
          info('error','file must have docx extends',
          {text:'look here',onclick:()=>{
            window.location.href='/helpdoc'
          }})
          hide()
      }
  }
  
}
const infoshow=(e)=>{
    const info=document.getElementById('info-note')
    info.style.display='block'
    info.innerHTML="info"


}

const Addnote=()=>{
    socket.on('fileisnotnote',()=>{
      hide()
      document.getElementById('error').innerHTML='file cant be a note'

    })
  socket.on('nameisused',()=>{
      hide()
      document.getElementById('error').innerHTML='name is already exists'
  })
 
    if(!getCookie('Username')){
        window.location.href='/sign'
    }
    socket.on('notewasadded',(e)=>{
        hide()
        window.location.href='./note&'+e+'&1'
    })
    return (
    <div className='addnote'>
    <div id='info-note' style={{position:"absolute",
    backgroundColor:'black',
    color:"white",
    display:'none'}} >waleed</div>
    <h1 style={{textAlign:"center"}} >اضافة تلخيص</h1>
    <div>
    <b >اسم التلخيص</b>
    <br/>
    <input type='text' id='note-name'/>
    <br/>
    </div>
    <div>
    <b onMouseEnter={infoshow} >اسم الكاتب </b>
    <br/>
    <input type='text' id='note-author'/>
    <br/>
    </div>
    <div>
    <b>الملف</b>
    <br/>
    <input type='file' id='note-file'/>
    <br/>
    </div>
    <div>
    <b>description</b>
    <br/>
    <textarea rows="10" cols="50"  id='note-description'/>
    <br/>
    </div>
    <p id='error'></p>
    <input type='submit' onClick={upload} />
    
    </div>
    )
}

export default Addnote