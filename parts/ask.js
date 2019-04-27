import React from 'react'
import io from 'socket.io-client'
import getCookie from './getcookie'
import './loading'
import { hide, show } from './loading';


const socket=io()

const Ask=()=>{
   const submite=(e)=>{
        e.preventDefault()
        show()
        const title=document.getElementById("title")
        const body=document.getElementById("body") 
        const tages=document.getElementById("tages") 

        if(title.value.trim()!=""&&body.value.trim()!=""
        &&tages.value.trim()!=""&&title.value.trim().length<135&&
        tages.value.trim().length<40){
            socket.emit("addquestion",{
                title:title.value,
                body:body.value,
                tages:tages.value,
                name:getCookie("Username")
                ,ider:getCookie("id"),
                pass:getCookie("pass")
            })
            console.log("writing question")
            socket.on('notloged',()=>{
                signout()
            })
            socket.on("added",(e)=>{
                window.location.href='./question'+e
                hide()
            })
        }else{
            if(title.value.trim()==""||title.value.trim().length>135){
                title.style.border="2px solid red"
            }else{
                title.style.border="none"
            }
                if(tages.value.trim()==""||tages.value.trim().length>40){
                tages.style.border="2px solid red"
            }else{
                tages.style.border="none"
            }if(body.value.trim()==""){
                body.style.border="2px solid red"
            }else{
                body.style.border="none"
            }
            hide()
        }

    }
    return(
        <div className="ask">
            <h1>Whats your quetion</h1>
            <p>title</p>
            <input placeholder="title" id="title"
                autoComplete="off" spellCheck="false"
            />
            <p>body</p>
            <textarea rows="10" cols="70" id="body"
                autoComplete="off" spellCheck="false"
                 />
            <p>tages</p>
            <input placeholder="tages" id="tages"
                autoComplete="off" spellCheck="false"  />
            <br/>
            <input type="submit" onClick={submite} />
        </div>
    )
}
export default Ask