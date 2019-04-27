import React from 'react'
import io from 'socket.io-client'
import {Link} from "react-router-dom"
import {hide,show} from './loading'
import Currenttime from './currenttime';
import Pagechangernote from './pagechangernote';

const socket=io()

class Question extends React.Component{
    constructor(e){
        super(e)
    
    show()
    this.search=this.search.bind(this)
    this.sort=this.sort.bind(this)
        this.state={qeustions:[]}
            socket.emit('db',{number:parseInt(e.page),
            type:e.type})
            socket.emit('gettime')
            socket.on('gettime',(e)=>{
                this.setState(()=>{
                    return ({time:e})
                })
            })
            socket.on("db",(s)=>{
                this.setState(()=>{return({qeustions:s.array,
                    length:s.length})},()=>{
            document.getElementById('loading-question').style.display='none'
                    hide()
             })
            })
    }
    componentWillReceiveProps(e) {
        show()
        document.body.scrollTop =
        document.documentElement.scrollTop = 300;
        socket.emit('db',{number:parseInt(e.page),
            type:this.props.type})
        
    }


    componentDidMount(){
        console.log(this.props)
        let children= document.getElementById('type').children
        if(this.props.type=="Hot"){
            children[0]
            .style.backgroundColor='rgb(46, 3, 3)'
        }else{
            children[1]
            .style.backgroundColor='rgb(46, 3, 3)'  
        }
    }
    search(e){
        e.preventDefault()
        const page=this.props.page
        if(e.target.sort.value=="likes"){
        socket.emit('db',{number:parseInt(page),likes:true,
            text:e.target.text.value})
        }else if(e.target.sort.value=="views"){
        socket.emit('db',{number:parseInt(page),views:true,
            text:e.target.text.value})
        }else{
        socket.emit('db',{number:parseInt(page),
            text:e.target.text.value})
    }

        socket.on("db",(s)=>{
            this.setState(()=>{return({qeustions:s.array,
                length:s.length})
            })
        })
    }
    sort(e){
        document.getElementById('searchid').value=''
        const page=this.props.page
        if(e.target.value=="likes"){
        socket.emit('db',{number:parseInt(page),likes:true})
        }else if(e.target.value=="views"){
        socket.emit('db',{number:parseInt(page),views:true})
        }else{
        socket.emit('db',{number:parseInt(page)})
    }

        socket.on("db",(s)=>{
            this.setState(()=>{return({qeustions:s.array,
                length:s.length})
            })
        })
    }

        render(){
           
            return(
                <div>
                <div>
            <form className='searchbox' onSubmit={this.search}>
             Sort by :  <select name='sort' onChange={this.sort} id="select">
                     <option>date</option>
                     <option>likes</option>
                     <option>views</option>
                 </select> 
             Search : <input type='text' placeholder='search' name='text' 
             id='searchid'/>
                <input type='submit' name='submit' value='search'
                 id="submit" />
                 </form>
                </div>
                 <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/ask">
                <button className="askbutton">اسال سؤال</button>
                </Link>
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div className="questions">
                <br/>
                <div id="type" className="type">
                    <h2>
                    <Link to="./Q&A1$Hot">
                    Hot
                    </Link>
                    </h2>
                    <h2>
                    <Link to="./Q&A1">
                    New
                    </Link>
                    </h2>
                    
                </div>
                <div
                style={{position:'relative'}}
                 className="loading" id="loading-question"></div>
                    {this.state.qeustions.map((e)=>{
                        return(
                             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} 
                             to={"/question"+e._id}>
                    <div className="question">
                    <div className='colom'>
                    <span>
                    <h1>{e.title}</h1>
                    <h4>{e.tages}</h4>
                    </span>
                    <div className='info'>
                    <h3>views: {e.views}</h3>
                    <h3>answers: {e.answers}</h3>
                    <h3>likes: {e.likesnames.length-
                    e.dislikesnames.length}</h3>

                    <p>{Currenttime(this.state.time,e.date)}</p>
                    </div>
                    </div>
                    <h1 className="arrow">{"...read more"}</h1>
                    </div>
                            </Link>
                        )
                    })
                    }

                    <Pagechangernote page={this.props.page} 
                    length={this.state.length/10}
                     link={'/Q&a'}
                     extension={this.props.type?"$"+this.props.type:''}
                     />
                </div>
            </div>
            )
        
        
        }
}
export default Question