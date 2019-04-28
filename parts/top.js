import React from 'react'
import Panel from './signwindow.js'
import {Link} from 'react-router-dom'
import getCookie from './getcookie.js';


class Top extends React.Component{
    constructor(e){
        super(e)

        document.onmouseover=(e)=>{
            if(e.target.className==""&&e.target.id!='currentpage'){
                e.target.className="buttons"
            }
        }
        document.onmouseout=(e)=>{
            if(e.target.className=="buttons"&&e.target.id!='currentpage'){
                e.target.className=""
                }
        }
    
        
    
    }

    render(){
       
    return(
        <div className="top">
        <Panel/>

    
        <br/>
        <h1>KDA'A.com</h1>
        <br/>
        <div className='mainbuttons'>

         <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/notes&1">
        <div style={{display:'inline-block'}}>
                <img width='70' height='70'
                 src='/note.png' />
                <h2>تلخيصات</h2>
                </div>
        </Link>
         <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/Q&a1">
                <div style={{display:'inline-block'}}>
                <img width='70' height='70'
                 src='/questionsicon.png' />
                <h2>أسئلة</h2>
                </div>
        </Link>
         <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/laws&1">
        <div style={{display:'inline-block'}}>
                <img width='70' height='70'
                 src='/book.png' />
                <h2>القوانين</h2>
                </div>
        </Link>
        </div>
         {/* <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/messages">
        <button>chat</button>
        </Link>
        <button>edary</button> */}
        {getCookie('ider')=='5cb9b96c02d8571774e83f1c'?
        <div 
        style={{position:'absolute'
        ,right:'1rem'
        ,top:'0rem'}}>
        <br/> 
        <Link  to="/reportrater*%5E$">
        <button style={{width:'auto'}}>reportes</button>
        </Link>
        </div>:''}
        </div>
        
    )
}
}

export default Top; 