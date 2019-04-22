import React from 'react'
import io from 'socket.io-client'
import Pagechangernote from './pagechangernote';
import getCookie from './getcookie'
import { hide, show } from './loading';
const socket=io()

class Note extends React.Component{
    constructor(e){
        super(e)
 
        this.state={pages:0}
        socket.on('law-was-notfound',()=>{
            hide()
            document.getElementById('error-law').innerHTML
            ="sorry <h2>This file was not found</h2>"
        })

        socket.emit('find-law',{name:e.name,num:e.num})
       show()
       
    }
    componentDidMount(){
        const  iframe=document.getElementById('doc')
       
        socket.on('law-was-found',(e)=>{
            hide()
            var blob = new Blob([(e.text)],
             { type: "application/pdf" });
            var objectURL = URL.createObjectURL(blob);
            iframe.src=objectURL+"#view=FitH"
            
            iframe.onload=()=>{
                document.getElementById('load').style.display='none'
               iframe.height=iframe.
               contentWindow.document.body.scrollHeight + "px";
            }

            iframe.height = "90%"

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
        socket.emit('find-law',{name:e.name,num:e.num})
        
    }
  
    render(){
        return(
            <div className='law'>
            <div className="loading" id="load"></div>
            <h1 
            style={{color:'white',textAlign:'center'
            ,margin:'3rem'}}
            >{this.props.name.replace('.pdf','')}</h1>
            <iframe
              id='doc' style={{width:"100%",resize:'both',
              height:'90vh',
              overflow:'auto'
              ,backgroundColor:"white"}}/>
           
            <h1 style={{textAlign:"center",color:"red"
            }} id="error-note">

            </h1>
            {
                this.state.pages?
            <Pagechangernote page={(this.props.num)}
                    length={this.state.length}
                     link={'/note&'+this.props.name+'&'}  />:''
            }
            </div>
            )
    }
}
export default Note