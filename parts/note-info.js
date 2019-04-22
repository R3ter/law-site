import io from 'socket.io-client'
import React from 'react'
import Currenttime from './currenttime'

const socket=io()

class Note_info extends React.Component{
constructor(e){
    super(e)
    socket.emit("getnoteinfo",e.id.replace(":",""))
    this.state={time:{},name:'',poster:'',author:''
            ,description:'',likes:0}
    socket.on("getnoteinfo",(e)=>{
        this.setState(()=>{
            return ({time:e.time,name:e.name,
                poster:e.poster,author:e.author
            ,description:e.description,likes:e.likes})
        })
    })
    socket.emit('gettime')
    socket.on('gettime',(e)=>{
        this.setState(()=>{
            return {currenttime:e}}
        )
    })
}
    render(){
        console.log(this.state)
        return (
            <div>
                <h2>{Currenttime(this.state.currenttime,this.state.time)}</h2>
            </div>
        )
    }
}
export default Note_info