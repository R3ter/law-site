import React from 'react'
import {Link} from 'react-router-dom'
import Currenttime from './currenttime';
import io from 'socket.io-client'
import Pagechangernote from './pagechangernote';
import { show, hide } from './loading';


const socket = io();
class Notes extends React.Component{
    constructor(e){
        super(e)
        if(e.page==undefined||e.page<1){e.page=1;}
        this.search=this.search.bind(this)
        this.sort=this.sort.bind(this)
        this.state={array:[],searcharray:[],notsearch:true,lenght:0
            ,time:{}}

        socket.emit('gettime')
                        socket.on('gettime',(date)=>{
                        this.setState(()=>{return({time:date})
                        })
                    })

        socket.emit('notes-files',{number:e.page})
        socket.on('notes-files',(e)=>{
            this.setState({array:e.array,length:e.length},()=>{
                document.getElementById('loading-notes').
                style.display="none"
            })
        })
        socket.on('notes-files-notfound',()=>{
            this.setState(()=>({array:['error'],length:0}))
            document.getElementById('loading-notes').
            style.display="none"
        })
    }
    componentWillReceiveProps(e){
        document.getElementById('loading-notes').
        style.display="block"
        socket.emit('notes-files',{number:e.page})
        socket.on('notes-files',(e)=>{
            this.setState({array:e.array
                ,length:e.length},()=>{
                    document.getElementById('loading-notes').
                    style.display="none"
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    
                })
            })
    }
    search(e){
        e.preventDefault()
        document.getElementById('loading-notes').
        style.display="block"
        if(e.target.text.value==''){
            this.setState({notsearch:true},()=>{
                document.getElementById('loading-notes').
                style.display="none"
            })
        }else{
            socket.emit('search-notes',e.target.text.value)
            socket.on('search-notes',(e)=>{
                this.setState({searcharray:e,notsearch:false},()=>{
                    document.getElementById('loading-notes').
                style.display="none"
                })
            })  
        }    
    }

    sort(e){
        console.log(e.target.value)
        show()

        if(e.target.value=="likes"){
        socket.emit('notes-files',{number:this.props.page,likes:true})
        }else if(e.target.value=="views"){
        socket.emit('notes-files',{number:this.props.page,views:true})
        }else{
        socket.emit('notes-files',{number:this.props.page})
        }

        socket.on('notes-files',(e)=>{
            this.setState({searcharray:e.array,
                array:e.array,length:e.length},()=>{
               hide()
            })
        })
    }

    render(){
        return(
            <div>
            <div
                style={{position:'relative'}}
                 class="loading" id="loading-notes"/>
                 <div>
                 <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to='./addnote'>
              <button className='askbutton'>upload note</button>
              </Link>
        
              <form className='searchbox' onSubmit={this.search}>
             Sort by :  <select name='sort' onChange={this.sort} id="select">
                     <option>date</option>
                     <option>likes</option>
                     <option>views</option>
                 </select> 
             Search : <input type='text' placeholder='search' name='text' />
                <input type='submit' name='submit' value='search'
                 id="submit" />
                 </form>
                 </div>
            {
                this.state.notsearch?
                this.state.array.map((e)=>{
                    /////////hada
                return(
                    <div style={{position:'relative'}}
                 className='notes'>
                <div style={{position:'absolute',
                top:"20%",
                left:"4%"}}>
                 <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} 
                 to={"./note-info:"+e.name}>
                    <h2 title="info"
                    style={{fontSize:"4rem",
                    cursor:'pointer'}}>&#9432;</h2>
                </Link>
                </div>
                <div>
                <div className='notename'>
                 <Link 
                style={{textDecoration: 'none'}}
                 to={'./note&'+e.name+"&1"}>
                    <h1 style={{display:'inline-block'}}
                    >
                    {e.name}</h1>
                </Link>
                </div>
                    <p style={{padding:"1rem"}} 
                    >{e.author}: author</p>

                    <p onClick={(r)=>{
                        r.target.innerHTML=e.description+": description"
                    }}
                     style={{paddingRight:'1rem'}}
                     >{e.description.length>40?e.description
                     .slice(0,40)+"read more...":e.description}:
                      description</p>
                <div className='info-notes' >
                      <p>{Currenttime(this.state.time,e.time)}</p>
                    <p 
                     >{e.likes} : ❤</p>
                    <p 
                     >views: {e.views}</p>
                
                </div>
                </div>
                </div>)
            }):this.state.searcharray.length>0?
            this.state.searcharray.map((e)=>{
                /////////////////////////ze elfok
                return(<div style={{position:'relative'}}
                 className='notes'>
                <div style={{position:'absolute',
                top:"20%",
                left:"4%"}}>
                 <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} style={{opacity:0,color:"rgba(0,0,0,0)"}}
                 to={"./note-info:"+e.name}>
                    <h2 title="info"
                    style={{fontSize:"4rem",
                    cursor:'pointer'}}>&#9432;</h2>
                </Link>
                </div>
                <div>
                 <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={'./note&'+e.name+"&1"}>
                    <h1 style={{display:'inline-block',
                    padding:"1rem",color:'blue'}}
                    >{e.name}</h1>
                </Link>
                    <p style={{padding:"1rem"}} 
                    >{e.author}: author</p>

                    <p onClick={(r)=>{
                        r.target.innerHTML=e.description+": description"
                    }}
                     style={{paddingRight:'1rem'}}
                     >{e.description.length>40?e.description
                     .slice(0,40)+"read more...":e.description}:
                      description</p>
                <div className='info-notes' >
                      <p>{Currenttime(this.state.time,e.time)}</p>
                    <p 
                     >likes: {e.likes}</p>
                    <p 
                     >views: {e.views}</p>
                
                </div>
                </div>
                </div>)
            }):<h2>Nothing was found</h2>}
            {this.state.notsearch?
            <Pagechangernote 
                page={(this.props.page)}
                    length={this.state.length}
                     link={'/notes&'} 
            />
            :''}
        </div>
        )
    }
}
export default Notes