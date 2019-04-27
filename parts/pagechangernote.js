import React from 'react'
import {Link} from 'react-router-dom'

const Pagechangernote=(e)=>{
    const array=[]
    const currentpage=e.page 
    for(let index=0; e.length>index; index++){
            array.push(index+1)
            }
 const link=e.link
if(e.length>1){
return(
    <div className='page-selector'>
        {parseInt(e.page)>1?
            <div style={{display:"inline-block"}}>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={e.link+1+
                (e.extension?e.extension:'')}>
            <button>{"<<"}</button>
            </Link>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={e.link+
            (parseInt(e.page)-1)+(e.extension?e.extension:'')}>
            <button>{"<"}</button>
            </Link>
            </div>:''}
            {array.slice(parseInt(e.page)<3?0:
            parseInt(e.page)-3,
            parseInt(e.page)+2)
            .map((ea,i)=>{
                if(ea==currentpage){
                    return <button key={i} id='currentpage'>{ea}</button>}
            return( <Link key={i}
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to ={link+(ea)
                +(e.extension?e.extension:'')}>
                 <button key={i}
                onClick={()=>{
                    // document.body.scrollTop =
                    //  document.documentElement.scrollTop = 0;
                }}>{ea}</button>
                </Link>)
            })}
            {parseInt(e.page)!=array.length?
            <div style={{display:"inline-block"}}>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={link+
            (parseInt(e.page)+1)+(e.extension?e.extension:'')}>
            <button>{">"}</button>
            </Link>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={e.link+array.length
                +((e.extension?e.extension:''))}>
            <button>>></button>
            </Link>
            </div>:''}
            </div>
        )
}else{
    return(<div></div>)
}
}


export default Pagechangernote