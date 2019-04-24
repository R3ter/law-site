import React from 'react'
import io from 'socket.io-client'
import {hide,show} from './loading'
import getCookie from './getcookie';
import Currenttime from './currenttime';
import {Link} from 'react-router-dom'
import Confirm from './confirm'
import info from './info';

const socket=io()
let hightext=''
let textarea;
class QuestionPage extends React.Component{
    constructor(e){
        super(e)
        show()
        const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        this.addcomment=this.addcomment.bind(this)
        this.scroll=this.scroll.bind(this)
        this.deletepost=this.deletepost.bind(this)
        this.seemore=this.seemore.bind(this)
        this.state={qeustion:"",error:"",answers:[],
        likes:"loading",num:5}
        socket.on('deleted',()=>{
            info('info','Deleted')
            socket.emit('dbOne',e.id)
        })
        socket.on('commentdeleted',()=>{
            info('info','answer Deleted')
            socket.emit('getcomments',e.id)
        })
        socket.on('cantdelete',()=>{
            info('error',"you cant delete dis after it gets answered")
            hide()
        })
        if(checkForHexRegExp.test(e.id)){
            socket.emit('addviewquestion',e.id)
            socket.emit('dbOne',e.id)
            }else{
                this.state.error="error 404";
                hide()                
            }
            socket.on("notfound",()=>{
                this.setState(()=>{
                    return({error:"error 404"})
                },()=>{
                    hide()
                document.getElementById('wait').innerHTML=''
                })
                
            })
            socket.on('donedislike',()=>{
                socket.emit('checklikes',{id:this.props.id,
               name:getCookie('Username')})
                })
                socket.on('donelike',()=>{
                    socket.emit('checklikes',{id:this.props.id,
                    name:getCookie('Username')})
                })
            socket.emit('getcomments',e.id)
            socket.on('getcomments',(e)=>{
               hide()
               if(window.location.hash.substr(1))
                this.setState(()=>{
                return{num:e.length}
                })
                this.setState(()=>{
                    return {answers:e.sort((a,b)=>{
                         try{
                             if(b._id == this.state.best){
                                return 1
                             }else{
                                 return(
                                     (a.dislikesnames.length-a.likesnames.length)
                                     -
                                     (b.dislikesnames.length-b.likesnames.length))
                                 }
                             }
                         catch(e){
                         return -1
                         }
                     })}
                },()=>{
                    document.getElementById('loading-comments').style
                    .display='none'
                })
            })
            socket.on("dbOne",(s)=>{
                if(s===null){
                    this.setState(()=>{return({error:"not found 404"})},()=>{
                        hide()                    
                    })
                }else{
                    this.setState(()=>{return({qeustion:s,
                        best:s.best
                       ,likes:s.likesnames.length-
                       s.dislikesnames.length })},()=>{
                        socket.emit('gettime',s.date)
                        socket.on('gettime',(date)=>{
                        document.getElementById('time').innerHTML=
                        Currenttime(date,s.date)
                        this.setState(()=>{return({time:date})
                        })
                    })
                        hide()
                    })
                }
                document.getElementById('wait').innerHTML=''
                document.getElementById('wait').style.display='none'
                })
            socket.emit('checklikes',{id:e.id,
                name:getCookie("Username")})

            socket.on('checklikes',(e)=>{
                if(e.liked){
                this.setState(()=>{
                    return {likes:e.likes,liked:true,disliked:false}
                })}
                else if(e.disliked){
                    this.setState(()=>{
                        return {likes:e.likes,disliked:true,liked:false}
                    })
                }else{
                    this.setState(()=>{
                        return {likes:e.likes,liked:false,disliked:false}
                    })
                }
                hide()
            })
            socket.on("changecommentlikes",(e)=>{
               const element=document.getElementById(e.id).getElementsByTagName('button')
               const elementlikes=document.getElementById(e.id).getElementsByTagName('p')
                if(e.liked){
                    element[0].style
                    .backgroundColor='blue'
                    element[1].style
                    .backgroundColor='white'
                }else if(e.disliked){
                    element[0].style
                    .backgroundColor='white'
                    element[1].style
                    .backgroundColor='red'
                }else{
                    element[0].style
                    .backgroundColor='white'
                    element[1].style
                    .backgroundColor='white'
                }
                elementlikes[0].innerHTML=e.likes
                elementlikes[1].innerHTML=e.dislikes
                hide()
            })
            socket.on('notloged',()=>{
                document.cookie = "Username" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = "id" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = "pass" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                localStorage.setItem('before','ask')
                window.location.href='./sign'
                hide()
            })
            socket.on("addcomment",(ee)=>{
                socket.emit("getcomments",this.props.id)
                socket.on("getcomments",(e)=>{
                    this.setState(()=>{
                        return({answers:e})},()=>{
                        hide()
                window.location.href=window.location.href+'#'+ee._id
                document.getElementById('showcomment').style.display
                ='inline-block'
                const text=document.getElementById('input-comment')
                text.style.display='none'
                text.className='hide-comment'
                    })
                })
            })
    }


 
    addcomment(e){
        e.preventDefault()
        if(e.target.text.value.trim().length>10){
            show()
            socket.emit('addcomment',
            {text:e.target.text.value,name:getCookie('Username')
            ,id:this.props.id,ider:getCookie('id'),
            pass:getCookie('pass')})
        }else{
            info('error','your answer is too short')
        }
        
    }
    seemore(){
        this.setState((e)=>{
            return{num:e.num+5}
        })
    }
    comment(e){
        e.target.style.display="none"
        const text=document.getElementById('input-comment')
            text.style.display='block'
            text.className='show-comment'
        
    }
    deletepost(){
       Confirm('Are you sure you want to delete this thing?',
       'once you delete it u cant undo dis shit',
       ()=>{
        show()
        socket.emit('deletequestion',{
            name:getCookie("Username")
            ,ider:getCookie("id"),
            pass:getCookie("pass"),id:this.props.id})
       })
        
    }
    scroll(){
        if(window.location.hash.substr(1))
    try{
      const daone= document.getElementById(window.location.hash.substr(1))
      window.scrollTo(0,daone.offsetTop-150)
      daone.className='answersa'
      console.log('done')
      setTimeout(() => {
          daone.className='answers'
          window.history.replaceState('','',window.location.href.split('#')[0]);
        }, 500);
    }catch(e){window.scrollTo(0,0)}
}
    componentDidMount(){
       textarea=document.getElementById('textarea')
        this.scroll()
    }
    componentDidUpdate(){
        this.scroll()
    }
    render(){
       this.scroll()
        try{
            const up=document.getElementById('addlike')
            const down=document.getElementById('adddislike')
            
            if(this.state.liked){
                up.style.borderBottomColor='darkgreen'
            }else{
                up.style.borderBottomColor='darkgray'
            }
            if(this.state.disliked){
                down.style.borderTopColor='darkorange'
            }else{
                down.style.borderTopColor='darkgray'
            }
        }catch(e){

        }
        
        return(
            <div>
               <h1 style={{display:"none",left:"50%",
               position:'fixed',textAlign:'center',top: "50%",
            left: "50%",color:"green",
            marginTop:"0px",marginLeft:"0px",zIndex:1000
               }}>Deleted &#10004;</h1>
                {this.state.error==''?
                <div>
                <div className="postlikes">
                <h1 id='addlike' onClick={()=>{
                    show()
                    socket.emit("addlikequestion",{
                        name:getCookie('Username'),
                                id:this.props.id
                                ,pass:getCookie('pass'),
                                ider:getCookie('id')
                                })
                }}></h1>
                <h1>{this.state.likes}</h1>
                <h1 id='adddislike' 
                
                 onClick={()=>{
                   
                     show()
                    socket.emit("adddislikequestion",{
                        name:getCookie('Username'),
                                id:this.props.id
                                ,pass:getCookie('pass'),
                                ider:getCookie('id')
                                })
                }}></h1>
                </div>
                <div className='creator'>
                <h2>was uploaded by  <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}}
                to={"./profile"+this.state.qeustion.userid}>
                {this.state.qeustion.name}
                </Link></h2>
                </div>
                <div style={{position:"relative"}}
                 className="questionpage">
                <h1 id='wait'>please wait....</h1>
                <p id='time'>calculating...</p>
                <h1>{this.state.qeustion.title}</h1>
                <h2>{this.state.qeustion.body}</h2>
                <p>{this.state.qeustion.tages}</p>


                {this.state.qeustion.name==
                getCookie("Username")||
                getCookie("ider")=='5cb9b96c02d8571774e83f1c'?
                <p onClick={this.deletepost} style={{
                color:'white',position:'absolute',right:'2rem',
                top:"85%",cursor:'pointer'}}
                >ازالة &#10060;</p>:""}
                <h3 style={{
                    position:'absolute',
                    left:'1rem'
                    ,bottom:'1rem'
                    ,cursor:'pointer'
                }} 
                onClick={()=>{
                    Confirm('Do you want to report this ?','',
                    ()=>{
                        socket.emit('report',{type:'note',
                            link:window.location.pathname,
                            name:getCookie('Username')?getCookie('Username'):
                            localStorage.getItem('key')})
                                info('info',
                                'this question has been reported')
                                })
                }}>flag</h3>
                </div>
                
                

                <div style={{textAlign:'center'}}>
                {getCookie('Username')?
                <h2 id='showcomment'
                 onClick={this.comment}>add comment</h2>
                 :''}
                <div style={{display:'none',
                height:'0px'}} id='input-comment' >
                <form 
                  onSubmit={this.addcomment}>
               
                <textarea maxlength="19066" id='textarea' 
                 name='text' 
                 style={{width:'80%',direction:'rtl',paddingRight:'1rem',
                 lineHeight:'1.3rem',paddingLeft:'1rem'}}
                  type='text'/>
                <br/>
                <input type='submit' style={{width:'80%',
                backgroundColor:'darkred',cursor:'pointer',
                color:'white',borderWidth:'2px',borderColor:'white'}}
                 value='add comment' />
                </form>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>Answers: </h1>
                </div>
                </div>
                :<h1 color="red">{this.state.error}</h1>}
                
                    <div className="loading" style={{
                        position:'relative'
                    }} id="loading-comments"></div>

                {
                    this.state.answers?
                    this.state.answers.length==0?
                    <h2 style={{color:'red',textAlign:'center'
                    ,margin:'2rem'}}
                    >no answers</h2>:
                    this.state.answers.slice(0,this.state.num).map((e)=>{
                    return (
                        <div id={e._id} className='answers'>
                        
                        <div className='name-best'>
                         <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={"./profile"+e.userid}>
                        {e.name==this.state.qeustion.name?
                        <h2 style={{display:"inline-block",
                        backgroundColor:'#66ff33',
                        color:'black'}}>{e.name} :</h2>
                        :
                        <h2 style={{display:"inline-block"}}>{e.name} :</h2>
                        }
                        </Link>
                        {e._id==this.state.best?
                        <h1 className='bestanswer'>✔️</h1>:""}
                        </div>
                        <h2 style={{marginBottom:'4rem'}}>{}</h2>
                        <div className='commentstime'>
                        <h2>{e.text}</h2>
                          <h4>{Currenttime(this.state.time,e.time)}</h4>
                          <div id='space'>
                          <div className='like-comment' id={e._id}>
                          
                        <button 
                        style={{backgroundColor:
                        e.likesnames.includes(getCookie("Username"))?
                        "blue":"white"
                        }}
                        onClick={()=>{
                            show()                            
                            socket.emit('addlikecomment',
                            {name:getCookie('Username'),
                                id:e._id
                                ,pass:getCookie('pass'),
                                ider:getCookie('id')})
                        }}
                         id='like-comment'>👍اوافق</button>
                         <p>{e.likesnames.length}</p>
                        <button 
                        style={{backgroundColor:
                        e.dislikesnames.includes(getCookie("Username"))?
                        "red":"white"
                        }}
                        onClick={()=>{
                            show()
                            socket.emit('dislikecomment',
                            {name:getCookie('Username'),
                                id:e._id
                                ,pass:getCookie('pass'),
                                ider:getCookie('id')})
                        }} 
                        id='dislike-comment'>👎لااوافق</button>
                        <p>{e.dislikesnames.length}</p>
                          </div>
                        {getCookie("Username")==this.state
                        .qeustion.name&&e._id!=this.state.best?
                        <p style={{cursor:"pointer"}} onClick={()=>{
                            socket.emit('setbest',{
                                commentid:e._id,
                                name:getCookie('Username'),
                                id:this.state.qeustion._id
                                ,pass:getCookie('pass'),
                                ider:getCookie('id')})
                                this.setState(()=>{
                                   return {best:e._id}
                                })
                        }
                        }>set as the right answer</p>:""}
                        <div>
                        <h3 style={{display:'inline-block',
                        margin:'2rem',cursor:'pointer'}} onClick={()=>{
                           const copy= document.createElement('input')
                           document.body.appendChild(copy)
                            copy.value=window.location+'#'+e._id
                            copy.select()
                            console.log(copy.value)
                            document.execCommand("copy")
                            copy.remove()
                            info('info','تم نسخ الرابط')
                        }}
                        >مشاركة</h3>
                        <h2 style={{display:'inline-block'
                        ,cursor:'pointer'}}
                        title='ابلاغ'
                        onClick={()=>{
                            socket.emit('report',{type:'note',
                            link:window.location.pathname+"#"+e._id,
                            name:getCookie('Username')?getCookie('Username'):
                            localStorage.getItem('key')})
                                info('info','Reported',
                                'we will review this answer and take the right action')
                        }}
                        >🏴</h2>
                        </div>

                          </div>
                        </div>
                        {getCookie("Username")==e.name||
                        getCookie("ider")=='5cb9b96c02d8571774e83f1c'?
                        <p style={{cursor:'pointer'
                        ,color:'red',margin:'1rem'}}
                        onClick={()=>{
                            Confirm('are u sure u want to delete dis',
                            'once u delete dis u cant get it back',
                            ()=>{
                                show()
                                socket.emit('deletecomment',
                                {name:getCookie('Username'),
                                id:e._id
                                ,pass:getCookie('pass'),
                                ider:getCookie('id')
                                ,questionid:this.props.id
                                })
                            }
                            )
                        }}>&#10060; إزلة الاجابة</p>:""}
                        </div>
                        )
                })
                :''}
                {this.state.num>=this.state.answers.length?
                "":(<div style={{width:'100%',display:'flex'}}>
                <button style={{width:'auto',margin:'auto',
                backgroundColor:'#670043',color:'white'}}
                onClick={this.seemore}>
                see more comments</button>
                </div>)
                }
            </div>
        )
        
    }
}

export default QuestionPage