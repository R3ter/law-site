import React from 'react'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'

const socket=io()

let answers=[]

class Answers extends React.Component{
    constructor(e){
        super(e)
        this.addcomment=this.addcomment.bind(this)
        this.seemore=this.seemore.bind(this)
        this.state={answers:[]}
        socket.emit('getcomments',e.id)
        socket.on('getcomments',(e)=>{
            this.setState(()=>{
                return {answers:e}
            },()=>{
                document.getElementById('loading-comments').style
                .display='none'
            })
        })
        socket.on("addcomment",(e)=>{
            console.log(e)
            socket.emit("getcomments",this.props.id)
            socket.on("getcomments",(e)=>{
                this.setState(()=>{
                    return({answers:e})},()=>{
                    hide()
            document.getElementById('showcomment').style.display
            ='inline-block'
            const text=document.getElementById('input-comment')
            text.style.display='none'
            text.className='hide-comment'
                })
            })
        })
    }
    seemore(){
        this.setState((e)=>{
            return{num:e.num+5}
        })
    }
    addcomment(e){
        e.preventDefault()
        show()
            socket.emit('addcomment',
            {text:e.target.text.value,name:getCookie('Username')
            ,id:this.props.id,ider:getCookie('id'),
            pass:getCookie('pass')})
        
    }
    render(){
        answers=
            this.state.answers.sort((a,b)=>{
            try{
                if(this.state.qeustion.best==b._id){
                    return 1
                }
                else{
                    return(
                    (a.dislikesnames.length-a.likesnames.length)-
                    (b.dislikesnames.length-b.likesnames.length))
                } 
            }catch(e){
                console.log(e)
                return 0
            }
        })
        return(
        <div answers>
        {
            this.state.answers?
            this.state.answers.length==0?
            <h2 style={{color:'red',textAlign:'center'
            ,margin:'2rem'}}
            >no answers</h2>:
            answers.slice(0,this.state.num).map((e)=>{
            return (
                <div className='answers'>
                <div class="loading" style={{
                        position:'relative'
                    }} id="loading-comments"></div>
                <div className='name-best'>
                 <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={"./profile"+e.userid}>
                <h2 style={{display:"inline-block"}}>{e.name} :</h2>
                </Link>
                {e._id==this.state.qeustion.best?
                <h1 className='bestanswer'>best</h1>:""}
                </div>

                <p>{e.text}</p>
                <div className='commentstime'>
                
                  <p>{Currenttime(this.state.time,e.time)}</p>
                  <div id='space'>
                  <div className='like-comment'>
                  
                <button onClick={()=>{
                    
                    socket.emit('addlikecomment',
                    {name:getCookie('Username'),
                        id:e._id
                        ,pass:getCookie('pass'),
                        ider:getCookie('id')})
                }}
                 id='like-comment'>👍</button>
                 <p>{e.likesnames.length}</p>
                <button onClick={()=>{
                    
                    
                    socket.emit('dislikecomment',
                    {name:getCookie('Username'),
                        id:e._id
                        ,pass:getCookie('pass'),
                        ider:getCookie('id')})
                }} 
                id='dislike-comment'>👎</button>
                <p>{e.dislikesnames.length}</p>
                  </div>
                {getCookie("Username")==this.state
                .qeustion.name?
                <p style={{cursor:"pointer"}} onClick={()=>{
                    socket.emit('setbest',{
                        commentid:e._id,
                        name:getCookie('Username'),
                        id:this.state.qeustion._id
                        ,pass:getCookie('pass'),
                        ider:getCookie('id')})
                        this.setState((e)=>{
                           return {answers:e.answers}
                        })
                }
                }>set as the right answer</p>:""
                }

                  </div>
                </div>
                </div>
                )
        }):''}
        {this.state.num>=this.state.answers.length?
        "":<button onClick={this.seemore}>
        see more comments</button>
        }
    </div>)
    }
}


export default Answers