import React from 'react'
import getCookie from './getcookie'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import {show,hide} from './loading'

const socket=io();

const signout=()=>{
    socket.emit("signout",getCookie("id"))
        document.cookie = "Username" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "id" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "ider" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = "pass" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        show()
        socket.on("signedouterror",()=>{
            hide()
        })
        socket.on("signedout",()=>{
                hide()
                window.location.reload(false)
        })
}

const Side=()=>{
    window.addEventListener('scroll', (e)=>{
        if(document.body.scrollTop<511){
            
            document.getElementById('top-side').className
            ="hide-top-side"
            
        }else{

            document.getElementById('top-side').className
            ="top-side"
        }
        
    });

    return(
        <div>
        <div id="top-side" className="hide-top-side">
            <div className='main-icon'>
            <img 
            onContextMenu={(e)=>{e.preventDefault()}}
             onDragStart={(e)=>{e.preventDefault()}}
             width='90' height='60' src="./img1.jpg"/>
            </div>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/notes&1">
        <button>notes</button>
        </Link>
         <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/laws">
        <button>laws</button>
        </Link>
         <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/Q&a1">
        <button>Q&A</button>
        </Link>
         <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/messages">
        <button>chat</button>
        </Link>
        <button>edary</button>
            {getCookie('Username')?
            <div>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={'profile'+getCookie("ider")}>
            <h2 style={{cursor:"pointer",textAlign:'center'}}
            >{getCookie('Username')}</h2>
            </Link>
            </div>
           :
            <h2 onClick={()=>{
            window.scrollTo(0,0)
            document.getElementById("signin").className="show"
            document.getElementById("usernameinput").focus();
            }}
             style={{cursor:'pointer'
             ,paddingLeft:'2rem',paddingRight:'2rem',
             whiteSpace:'nowrap'}}
            >login</h2>}
        </div>
        <div  id="side-move">
            </div>
            </div>
    )
}

export default Side