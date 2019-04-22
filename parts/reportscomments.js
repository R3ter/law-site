import React from 'react'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import getCookie from './getcookie';
import Confirm from './confirm';
const socket=io()

class Reports extends React.Component{
    constructor(e){
        super(e)
        this.state={array:[]}
socket.emit('getreportscomments',{
            name:getCookie('Username')
            ,ider:getCookie('id'),
            pass:getCookie('pass')})
socket.on('getreportscomments',(e)=>{
    this.setState(()=>{
        return {array:e}
    })
})
}
render(){
return(
<div>
{this.state.array.map((e,index)=>{
return(
    <div style={{color:'white',
    backgroundColor:'red'}} key={index}>
    <Link style={{color:'rgb(49, 226, 250)',
        textDecoration: 'none'}}
         to={'question'+e.questionid+'#'+e.commentid}>
    <h1>{e.questionid+'#'+e.commentid}</h1>
    </Link>
    <h1 style={{textAlign:'center'}}
     >{e.names.length}</h1>
     <h2 style={{cursor:'pointer'}}
              onClick={()=>{
                  Confirm('are u sure','are u sure',()=>{
                 socket.emit('deletereportcomment',
                 {id:e._id,
                    name:getCookie('Username')
                    ,ider:getCookie('id'),
                    pass:getCookie('pass')})
                  })
             }}>delete</h2>
    </div>
)
})}
</div>
)
}
}


export default Reports