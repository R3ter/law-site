import React from 'react'
import io from 'socket.io-client'
import Pagechangernote from './pagechangernote';
import getCookie from './getcookie'
import { hide, show } from './loading';
const socket=io()

class Note extends React.Component{
    constructor(e){
        super(e)
        if(e.num==undefined||e.num==null){
            e.num=1
        }

        this.state={pages:0}
        
        socket.on('note-was-notfound',()=>{
            hide()
            document.getElementById('error-note').innerHTML
            ="sorry <h2>This file was not found</h2>"
        })

        socket.emit('addview',e.name)
        this.like=this.like.bind(this)
        socket.emit('find-note',{name:e.name,num:e.num})
       show()
       
    }
    componentDidMount(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        socket.on('note-was-found',(e)=>{
            hide()
         const  iframe=document.getElementById('doc')
         iframe.contentDocument.open()   
         iframe.
            contentDocument.write(((e.text).trim())
            .replace(/\uFFFD/g, ''))
        iframe.contentDocument.close()
            
            iframe.height = iframe.contentWindow.
            document.body.scrollHeight + "px";

            document.getElementById('error-note').innerHTML=""
            
            this.setState({pages:e.pages,
                length:e.length})
        })
        if(getCookie("Username")){
        socket.emit('isliked',{
            name:getCookie("Username"),
            note:this.props.name})
        socket.on('isliked',()=>{
        document.getElementById('addlike').innerHTML="remove like"
        })
        socket.on('isnotliked',()=>{
        document.getElementById('addlike').innerHTML="add like"
        })}
    }
    componentWillReceiveProps(e){
        show()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        socket.emit('find-note',{name:e.name,num:e.num})
        
    }
    like(e){
        e.target.innerHTML="loading"
        socket.emit('addlike',{
            note:this.props.name,
            name:getCookie("Username")
            ,ider:getCookie("id"),
            pass:getCookie("pass")})
        socket.on('deletelike',()=>{
        document.getElementById('addlike').innerHTML="add like"            
        })
        socket.on('addlike',()=>{
        document.getElementById('addlike').innerHTML="delete like"
        })
    }
    render(){
        return(
            <div>
            <div>
                 {
                 getCookie("Username")?
                 <button onClick={this.like} 
                  id='addlike'>loading</button>
                 :""
                 }
            </div>
            <div className='law'>
            <iframe id='doc' style={{width:"90%",
            backgroundColor:"white"}}/>
           
            <h1 style={{textAlign:"center",color:"red"}} id="error-note">

            </h1>
            {
                this.state.pages?
            <Pagechangernote page={(this.props.num)}
                    length={this.state.length}
                     link={'/note&'+this.props.name+'&'}  />:''
            }
            </div>
            </div>
            )
    }
}
export default Note