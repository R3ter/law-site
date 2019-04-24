import React from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import Pagechangernote from './pagechangernote';
import { show, hide } from './loading';
const socket=io()

class Laws extends React.Component{
    constructor(props){
        super(props)
        show()
        this.state={laws:[]}
        socket.emit("getlaws")
        socket.on('getlaws',(e)=>{
            this.setState(()=>{
                return ({laws:e,slice:parseInt(props.id)})
            },()=>{
                hide()
            })
        })
    }
    componentWillReceiveProps(props){
        this.setState(()=>{
            return ({slice:parseInt(props.id)})
        },()=>{
            window.scrollTo(0,0)
        })
    }
    search(e){
        e.preventDefault()
        if(e.target.text.value.trim())
        socket.emit('getlaws',e.target.text.value)
    }
    clear(e){
        if(e.target.value){
            return
        }
        socket.emit('getlaws')
    }
    render(){
        return(<div>
        <div className="formsearchbox">
        <form onSubmit={this.search} >
        بحث:
            <input name='text' onChange={this.clear} />
            <input type='submit' name='submit' value="بحث"/>
        </form>
        </div>
        {this.state.laws.slice((this.state.slice-1)*10
                    ,(this.state.slice)*10).map((e,index)=>{
            return (<div style={{
            width:"100%"}} key={index}>
                 <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={"law"+e+'&1'}>
                <h1 style={{
                textAlign:'center',
                width:'70%',
                padding:'2rem',
                marginLeft:'15%',
                backgroundColor:'red'
            }}>{e.replace('.pdf','')}</h1>
            </Link>
            </div>)
        })}
        <Pagechangernote 
                page={(this.props.id)}
                    length={this.state.laws.length/10}
                     link={'/laws&'} 
            />
        </div>)
    }
}

export default Laws