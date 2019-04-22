import React from 'react'
import {Link} from 'react-router-dom'


const PageChanger=(e)=>{
    const array=[]
    let page=0 ,page1=0
    const currentpage=e.page 
    for(let index=0; e.length>index; index++){
        page=page+1;
        if(page>=30){
            page1=page1+1
            array.push(page1)
            page=0
             }
    else if(e.length-index<30){
        page1=page1+1
        array.push(page1)
        page1=page1+1
        array.push(page1)
        break
        // array.push(page1)
        // array=[]
        }
    }
    const link=e.link
    
    return(
    <div className='page-selector'>
        {parseInt(e.page)>1?
            <div style={{display:"inline-block"}}>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={e.link+1}>
            <button>{"<<"}</button>
            </Link>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={e.link+
            (parseInt(e.page)-1)}>
            <button>{"<"}</button>
            </Link>
            </div>:''}
            {array.slice(parseInt(e.page)<3?0:
            parseInt(e.page)-3,
            parseInt(e.page)+2)
            .map((e,i)=>{
                if(e==currentpage){
                    return <button id='currentpage'>{e}</button>}
            return( <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to ={link+(e)}>
                 <button
                onClick={()=>{
            document.body.scrollTop =
            document.documentElement.scrollTop = 400;
                }}>{e}</button>
                </Link>)
            })}
            {parseInt(e.page)!=array.length?
            <div style={{display:"inline-block"}}>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={link+
            (parseInt(e.page)+1)}>
            <button>{">"}</button>
            </Link>
             <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to={e.link+array.length}>
            <button>>></button>
            </Link>
            </div>:''}
            </div>
        )
}


export default PageChanger
