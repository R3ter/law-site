import React from 'react'
import io from 'socket.io-client'
import Currenttime from './currenttime';
import {hide,show} from './loading'
import getCookie from './getcookie';
import info from './info';
var reader  = new FileReader();


const socket=io()

class Profile extends React.Component{
    constructor(e){
        super(e)
        reader.onload = () => {
            show()
            socket.emit('uploadimg',
            {content:reader.result,
                name:getCookie("Username")
                ,ider:getCookie("id"),
                pass:getCookie("pass"),
                id:getCookie("ider")})
            }
        socket.on('notimage',()=>{
            info('error',"you can't upload this image")
            hide()
        })
        socket.on('notloged',()=>{
            document.cookie = "Username" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = "id" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = "ider" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = "pass" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href='./sign'
        })
        this.changepic=this.changepic.bind(this)
        this.state={img:new ArrayBuffer(),
            commentslikes:'..',answers:'..',
            bests:"..",questions:"..",likes:"..",name:'wait..'}
            socket.emit('gettime')
            socket.on('gettime',(e)=>{
                this.setState(()=>{
                    return ({time:e})
                })
            })
socket.emit('getuserinfo',{e:e,username:getCookie('Username')})
socket.on("usernotfound",()=>this.setState(()=>{
    return {notfound:true}
}))
socket.on('userinfo',(e)=>{
    this.setState(()=>{return {
        name:e.name,
        last:e.lastseen,
        img:(e.img),likes:e.likes
        ,questions:e.questions,
        commentslikes:e.likesask,
        answers:e.comments,
        bests:e.bests
    }
    },()=>{
        hide()
    })
}) 
socket.on('updated',()=>{
    socket.emit('getuserinfo',{e:e,username:getCookie('Username')})
    info('info','you have changed ur pic idiot')
})
socket.on('userinfo',(e)=>{
    this.setState(()=>{
        hide()        
        
        return {
        name:e.name,
        last:e.lastseen,
        img:(e.img),likes:e.likes
        ,questions:e.questions,
        commentslikes:e.likesask,
        answers:e.comments,
        bests:e.bests
    }
    })
}) }

componentWillReceiveProps(e){
    this.setState(()=>{
        return {notfound:false}
    })
    socket.emit('getuserinfo',{e:e,username:getCookie('Username')})

}
changepic(){
    const upload=document.getElementById('imgupload')
    upload.onchange=(e)=>{
        var file = e.target.files[0];
        if (file.name.split('.').pop()=='jpg'||
    file.name.split('.').pop()=='png'||file.name.split('.').pop()=='gif'
    ||file.name.split('.').pop()=='jpeg') {
        if(file.size>120000){
            upload.value=''
            alert('image size cant be bigger than 1.2MB')
        }else{
            reader.readAsArrayBuffer(file);
            
        }
    }else{
        upload.value=''
        alert('image must have jpg or png extention only')
    }
}
upload.click()
}
render(){
    if(this.state.notfound){
        return(<div>
            <h1 style={{textAlign:'center',color:"red"}}>
            user can not be found</h1>
        </div>)
    }
    return(
        <div className='profile'>
            <h1 id="name"
             style={{textAlign:"center"}}>{this.state.name}</h1>
            <div className='img'>
            <img width="250" height='300' 
            onContextMenu={(e)=>{e.preventDefault()}}
            onDragStart={(e)=>{e.preventDefault()}}
              src={'data:image/jpeg;base64,'+
              Buffer.from(this.state.img).toString('base64')}
              />
              {this.state.name==getCookie('Username')?<div
               className="changebutton">
              <input type="file" id="imgupload" style={{display:'none'}}/> 
              <h3 onClick={this.changepic}>Change pic</h3></div>:""}
            </div>
              <div className='info'>
             <h2>likes for questions : {this.state.commentslikes}</h2>
             <h2>likes for answers : {this.state.likes}</h2>
             <h2>answers : {this.state.answers}</h2>
             <h2>best answers : {this.state.bests}</h2>
             <h2>questions : {this.state.questions}</h2>
             <h2>last activity : {Currenttime(this.state.time,
             this.state.last)}</h2>
              </div>
             
        </div>
    )}
    }

export default Profile;






