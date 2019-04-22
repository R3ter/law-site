import React from 'react'
import io from 'socket.io-client'
import getCookie from './getcookie'

const socket=io()

class Message extends React.Component{
    constructor(e){
        super(e)
        this.state={messages:[]}
        socket.on("getmessages",(e)=>{
            console.log(e)
            this.setState(()=>{
                return {messages:e.messages}
            })
        })
        socket.on('getaccounts',(e)=>{
            // console.log(e)
        })
        socket.emit('getaccounts',{
            name:getCookie("Username")
            ,ider:getCookie("id"),
            pass:getCookie("pass")
        })

        if(getCookie('Username')){
            socket.emit('getmessages',
            {   name:getCookie("Username")
                ,ider:getCookie("id"),
                pass:getCookie("pass")})
        }else{
            document.location.href='/sign'
        }
    }
    render(){
        return(
        <div style={{width:"100%",
        height:'100%'}}>
            {this.state.messages.map((e)=>{
                console.log(e)
                return (<h1>{e.user}</h1>)
            })}
        </div>
        )
    }
}
export default Message