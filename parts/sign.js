import React from 'react'
import io from 'socket.io-client'
import {hide,show} from './loading'
import getCookie from './getcookie'
import info from './info';
const socket=io();


const signin=(e)=>{
    e.preventDefault()
    if(e.target.username.value.trim()!=""&&
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
            window.history.back();
            })

        socket.on("wrongpass",()=>{
        hide()
        console.log("wrong password")
        document.getElementById('error').innerHTML='Wrong password'
        })
        socket.on("wrongusername",()=>{
            hide()
            document.getElementById('error').innerHTML='Wrong username'
            console.log("wrong username")
        })
    }else{
        console.log('error')
        document.getElementById('error').innerHTML='please fill all'+
        'the blanks'
    }
}
const signup=(e)=>{
    e.preventDefault()
    show()
    if(e.target.username.value.length<5){
        hide()
        document.getElementById('error-signup').innerHTML='username have to be taller than 5 chars'
    }else
    if(e.target.username.value==""||e.target.email.value==""||
    e.target.repassword.value==""||e.target.password.value=="" ){
        hide()
        document.getElementById('error-signup').innerHTML='fill all the blanks please'
    
    }else if(/\s/.test(e.target.username.value)||/\s/.test(e.target.password.value)||
    /\s/.test(e.target.email.value)){
        console.log("white spaces is not allowed")
        document.getElementById('error-signup').innerHTML='white spaces is not allowed'
            hide()
    }else if(e.target.repassword.value!=e.target.password.value){
        console.log('password does not match')
        
        document.getElementById('error-signup').innerHTML='password does not match'
        hide()
    }else if(e.target.password.value.trim().length<7){
        console.log('password is too short')
        document.getElementById('error-signup').innerHTML='password is too short'
        hide()
    }
    else{
        socket.emit("signup",
        {username:e.target.username.value,
        password:e.target.password.value,
        email:e.target.email.value})
         show()
         socket.on('signupfaild',()=>{
            info('error'
            ,"something is wrong whit your info please check it"
            ,'please login')            
         })
        socket.on("signupsucc",()=>{
            info('info',"you have signed up",'please login')
            clickedsign_in()
            document.getElementById('error').style.color='rgb(0, 255, 42)'
            document.getElementById('error').innerHTML='you have signed up'+
             ' successfully please log in'
            hide()
        })
        socket.on("signupfailed",()=>{
            console.log("signup has failed")
    document.getElementById('error-signup').innerHTML='signup failed'
            hide()
        })
        socket.on("useralready",()=>{
            console.log("username is already taken")
    document.getElementById('error-signup').innerHTML='username is already taken'

                hide()
        })
    }

}
const clickedsign_up=(e)=>{
    
    const sign_in=document.getElementById('sign-in')
    const sign_up=document.getElementById('sign-up')
    sign_in.style.display='none'
    sign_up.style.display='block'
    document.getElementById('error').style.color='red'

    const h2signin=document.getElementById('h2signin')
    const h2signup=document.getElementById('h2signup')
    
    
    h2signin.style.boxShadow=''
    h2signup.style.boxShadow='none'
}
const clickedsign_in=(e)=>{
    
    const sign_in=document.getElementById('sign-in')
    const sign_up=document.getElementById('sign-up')
    sign_in.style.display='block'
    sign_up.style.display='none'

    

}
const Sign=()=>{
    if(getCookie("Username")){
        window.history.back();
    }
    return (
        <div>
        <div className="log" >
        <div className="logh2" >
        <h2 id="h2signin"
         onClick={clickedsign_in}>SignIn</h2>
        <h2  id="h2signup"
        onClick={clickedsign_up}>SignUp</h2>
        </div>
         
        <div className="sign-in" id="sign-in">
        <div className="logform">
        <br/>
        
            <form onSubmit={signin}>
            username : 
                <input type="username" name="username" />
                <br/>
            password:
                <input type="password" name="password" />
                <br/>    
                <h3 id='error' style={{color:'red'}} ></h3>
                <input className="loginsubmit" value='Sign In'
                type="submit" />
            </form>
        </div>
        </div>




        
        <div className="sign-up" id="sign-up" style={{display:"none"}}>
        <div className="logform">
        <br/>
        
            <form onSubmit={signup}> 
            username : 
                <input type="username" name="username" />
                <br/>
            password:
                <input type="password" name="password" />
                <br/>    
                re-password:
                <input type="password" name="repassword" />
                <br/>    
                E-mail:
                <input type="email" name="email" />
                <br/>    
                <h3 id='error-signup'></h3>
                <input className="loginsubmit" type="submit"  
                    value='Sign Up' 
                />
            </form>
        </div>
        </div>
        </div>
        </div>

    )
}

export default Sign