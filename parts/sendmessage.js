import React from 'react'
import io from 'socket.io-client'
import getCookie from './getcookie'

const socket=io()

class Sendmessage extends React.Component{
    constructor(e){
        super(e)
        
        this.state={chat:[]}
        socket.emit('getchat',{
            name:getCookie("Username")
            ,ider:getCookie("id"),
            pass:getCookie("pass"),
            to:e.id
        })
        socket.on('getchat',(e)=>{
            console.log(e)
            this.setState(()=>({chat:e}))
        })
    }
    render(){
        return (<div>
        <div>
        
        </div>
        </div>)
    }
}

export default Sendmessage