import React from 'react'
import io from 'socket.io-client'
import Pagechangernote from './pagechangernote';
import getCookie from './getcookie'
import confirm from './confirm'
import info from './info'
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

        this.like=this.like.bind(this)
        socket.emit('find-note',{name:e.name,num:e.num})
       show()
       socket.on('note-was-found',(e)=>{
        hide()
     const  iframe=document.getElementById('doc')
     let text=''
     e.text.map((e)=>{
         text=text+e
     })
     iframe.contentDocument.open()   
     iframe.contentDocument.write('<html dir="rtl">'+
     (text)+'</html>')
     iframe.contentDocument.close()
     iframe.onload=()=>{
         iframe.height = iframe.contentWindow.
         document.body.scrollHeight + "px";
     }
     iframe.height = iframe.contentWindow.
     document.body.scrollHeight + "px";
        this.setState({pages:e.pages,
            length:e.length,error:false})
    })
    }
    componentDidMount(){
        const  iframe=document.getElementById('doc').dir='rtl'
        console.log(iframe)

        socket.emit('addview',this.props.name)
        
       
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
        const  iframe=document.getElementById('doc')
        iframe.height='1px'
        socket.emit('find-note',{name:e.name,num:e.num})
        show()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        
    }
    like(e){
        if(can){
            if(e.target.style.color){
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
            }}
            
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
            info('info','Reported')
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
       getCookie('ider')=='5cb9b96c02d8571774e83f1c'?
       <div>
       <h1 onClick={()=>{
           confirm('are u sure?','',()=>{
           socket.emit('removenote',{
            note:this.props.name,
            name:getCookie("Username")
            ,ider:getCookie("id"),
            pass:getCookie("pass")
           })
              
           })
       }}>remove</h1>
             <br/>
       </div>:""
             }
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
            backgroundColor:"white",direction:'rtl'}}/>
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