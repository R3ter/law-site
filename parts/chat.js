import React from 'react'
import getCookie from './getcookie';
import io from 'socket.io-client'
const socket=io()
import signout from './signout'



class Chat extends React.Component{
    constructor(e){
        super(e)
        socket.on('notloged',()=>{
            signout()
        })
        
        socket.on("getmessages",(e)=>{
            console.log(e)
        })
    }
    componentDidMount(){
        socket.emit('getmessages',
        {name:getCookie('Username')
        ,ider:getCookie('id'),
        pass:getCookie('pass')})
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}

export default Chat