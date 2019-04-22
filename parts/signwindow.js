import React from 'react'
import io from 'socket.io-client'
import info from './info'
import {Link} from 'react-router-dom'
import {hide,show} from './loading'
import getCookie from './getcookie'

const socket=io();



class Panel extends React.Component{
    constructor(e){
        super(e)
        
        
        this.hide=this.hide.bind(this)
        this.signout=this.signout.bind(this)
        this.signin=this.signin.bind(this)
        const loginid=getCookie("id");
        const username=getCookie("Username");
        this.state={login:false,name:username}
        if(loginid==null||loginid==""||loginid==undefined){
        this.state={login:true,name:username}
        }
        
    }
    
    signout(e){
        e.preventDefault()
        socket.emit("signout",{
            name:getCookie("Username")
                ,ider:getCookie("id"),
                pass:getCookie("pass"),
        })
        document.cookie = "Username" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "id" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "ider" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "pass" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        show()
        socket.on("signedouterror",()=>{
            hide()
        })
        socket.on("signedout",()=>{
            this.setState(()=>{
                return({login:true,name:""})
            },()=>{
                hide()
                window.location.reload(false)
            })
        })
    }

    hide(e){
        if(document.getElementById("signin").className=="show"){
            document.getElementById("signin").className="hide"
        }else{
            document.getElementById("signin").className="show"
        }
    
    }
    
    signin(e){
        e.preventDefault()
        if(e.target.username.value.trim()!=""||
        e.target.password.value.trim()!=""){
            socket.emit("signin",
            {username:e.target.username.value.trim(),
            password:e.target.password.value.trim()})
            show()
            socket.on("loggedin",(e)=>{
            hide()
            document.cookie="Username="+e.username+";"+
            'expires=Thu, 18 Dec 2025 12:00:00 UTC' 
            document.cookie="pass="+e.pass+";"+
            'expires=Thu, 18 Dec 2025 12:00:00 UTC' 
            document.cookie="id="+e.id+";"+
            'expires=Thu, 18 Dec 2025 12:00:00 UTC' 
            document.cookie="ider="+e.ider+";"+
            'expires=Thu, 18 Dec 2025 12:00:00 UTC' 
               
                window.location.reload(false)
                
            })
            socket.on("wrongpass",()=>{
            hide()
            info('error','Wrong password')
            })
            socket.on("wrongusername",()=>{
                hide()
                info('error',"Wrong Username")
            })
        }
    }



    render(){
        if(this.state.login){
return(
<div>

<div className="sign">
    
        <button style={{backgroundColor:'green'}}
         onClick={this.hide}>login</button>
         <br/>
         <p>dont have an account  
           <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}}
           to='./sign' > register</Link>
        </p>
        </div>

<div style={{position:'relative'}}
 className="signinup" id="signin" style={{padding:"3rem"}} >
<form  onSubmit={this.signin} >
    <input name="username" id='usernameinput'/>
:اسم المستخدم 
    <br/>
    <br/>
    <input type="password" name="password"/>
:كلمة المرور  
    <br/>
    <input style={{display:'inline-block'
    }} type="submit" />
</form>
</div>




</div>
)}
else{
    return(
       <div id="names" className="hello" >
           <h2 color='green' >Hola  <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={"profile"+getCookie("ider")}>
           {this.state.name}</Link></h2>
           <button style={{backgroundColor:'rgba(255, 232, 25, 1)'}}
            onClick={this.signout}
           >Sign Out</button>
       </div> 
    )
}
}
}

export default Panel