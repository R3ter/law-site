import React from 'react'
import getCookie from './getcookie'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import {show,hide} from './loading'

const socket=io();

const signout=()=>{
    socket.emit("signout",getCookie("id"))
        //
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
             width='110' height='100' src="./logo.png"/>
            </div>
        <h2>
             <Link to="/notes&1">
        notes
        </Link>
        </h2>
        <h2>
         <Link to="/laws">
        laws
        </Link>
        </h2>
        <h2>
         <Link  to="/Q&a1">
        Q&A
        </Link>
        </h2>
            {getCookie('Username')?
        <div className='account'>
            <h2 style={{cursor:"pointer",textAlign:'center'}}
            >
             <Link to={'profile'+getCookie("ider")}>
            {getCookie('Username')}
            </Link>
            </h2>
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