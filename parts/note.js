import React from 'react'
import io from 'socket.io-client'
import Pagechangernote from './pagechangernote';
import getCookie from './getcookie'
import confirm from './confirm'
import { hide, show } from './loading';
const socket=io()
let can=true;
class Note extends React.Component{
    constructor(e){
        super(e)
        this.view=this.view.bind(this)
        this.report=this.report.bind(this)
        if(e.num==undefined||e.num==null){
            e.num=1
        }

        this.state={pages:0}
        
        socket.on('note-was-notfound',()=>{
            hide()
            this.setState(()=>({error:true}))
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
         iframe.contentDocument.write(((e.text).trim())
            .replace(/\uFFFD/g, ''))
        iframe.contentDocument.close()

        iframe.height = iframe.contentWindow.
        document.body.scrollHeight + "px";
        console.log(iframe.height)
            this.setState({pages:e.pages,
                length:e.length,error:false})
        })
        if(getCookie("Username")){
        socket.emit('isliked',{
            name:getCookie("Username"),
            note:this.props.name})
        socket.on('isliked',()=>{
        document.getElementById('addlike').style.color="green"
        document.getElementById('addlike').className='like'
        })
        socket.on('isnotliked',()=>{
        document.getElementById('addlike').className='like2'
        document.getElementById('addlike').style.color="gray"
        })}
    }
    componentWillReceiveProps(e){
       
        show()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        socket.emit('find-note',{name:e.name,num:e.num})
        
    }
    like(e){
        if(can){
        socket.emit('addlike',{
            note:this.props.name,
            name:getCookie("Username")
            ,ider:getCookie("id"),
            pass:getCookie("pass")})
            if(e.target.style.color=="green"){
                e.target.className="like2"
                e.target.style.color='darkgray'
            }else{
                e.target.className="like"
                e.target.style.color='green'
                setTimeout(()=>{
                    can=true
                },1000)
                can=false
            }
            
        }

        // socket.on('deletelike',()=>{
        // })
        // socket.on('addlike',()=>{
        // })
        // e.target.className='loadingicon'
    }
    report(){
        confirm('Do you want to report this?','',()=>{
            socket.emit('report',{type:'note',
            link:window.location.pathname,
            name:getCookie('Username')?getCookie('Username'):
            localStorage.getItem('key')})
        })
    }
    view(e){
        document.getElementById('doc').height = '1242px'
        show()
        if(e.target.value!='عدة صفحات'){
        socket.emit('find-note',{name:this.props.name,nopages:true})
        }else{
        socket.emit('find-note',{name:this.props.name,num:this.props.num})
        }
        
    }
    render(){

        return(
            <div>
            <div style={{display: 'flex',
             justifyContent:'space-around'}}>
                 {
                 getCookie("Username")&&!this.state.error?
            
                 <h1 onClick={this.like} 
                  id='addlike' style={{fontSize:'4rem'
                  ,cursor:'pointer'}}
                  >♥</h1>
                 :""
                 }
            </div>
            {!this.state.error?
            <div>
            <h1 style={{color:'white',
            textAlign:'center'}}>{this.props.name}</h1>
            <div className='law'style={{width:"90%",borderColor:'rgb(202, 5, 5)',
            borderWidth:'8px',borderStyle:'solid',position:'relative'}}>
            <div style={{direction:'rtl'}}>
            <div style={{color:'white',cursor:'pointer'
            ,position:"absolute",left:'2rem',top:'-1rem'}}
            onClick={this.report}>
            <h1 >🏴</h1>
            <p>تقديم بلاغ</p>
            </div>
            <p style={{color:'white',padding:'1rem',display:'inline-block'
            }} >طريقة العرض:</p>
            <select onChange={this.view}
             style={{display:'inline-block'}}>
            <option >عدة صفحات</option>
            <option >صفحة واحدة</option>
            </select>
            </div>
            <iframe id='doc' style={{width:'100%',
            backgroundColor:"white"}}/>
            </div>
            </div>
            :
            <h1 style={{textAlign:"center",color:"red"}}>
             File was not found
            </h1>
            }
            {
                this.state.pages?
            <Pagechangernote page={(this.props.num)}
                    length={this.state.length}
                     link={'/note&'+this.props.name+'&'}  />:''
            }
            </div>
            // </div>
            )
    }
}
export default Note