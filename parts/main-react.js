import './style/style.scss'
import './style/ask.scss'
import './style/main.scss'
import './style/side.scss'
import './style/questionpage.scss'
import './style/pageSelector.scss'
import './style/confirm.scss'
import './style/addnote.scss'
import './style/sign.scss'
import './style/notes.scss'
import './style/profile.scss'
import './style/law.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import Top from './parts/top'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import Question from './parts/question'
import QuestionPage from './parts/questionpage'
import Side from './parts/side'
import Notes from './parts/notes'
import Message from './parts/message'
import Laws from './parts/law'
import Sendmessage from './parts/sendmessage'
import Note from './parts/note'
import Note_info from './parts/note-info'
import Law from './parts/lawpage'
import Ask from './parts/ask'
import Addnote from './parts/addnote'
import Profile from './parts/profile'
import Sign from './parts/sign'
import Reports from './parts/reports'
import {hide} from './parts/loading'
import io from 'socket.io-client'
import uniqid from 'uniqid'


const socket=io()
socket.connect('localhost:3000')
const ask=()=>{return(
        <Ask/>
    )}
const log=()=>{
    return(
            <Sign/>
    )
}

class Main extends React.Component{
    
    constructor(e){
        super(e)
        if(!localStorage.getItem('key')){
            localStorage.setItem('key',uniqid())
        }
    }
       
       render(){
        
        return(
            <BrowserRouter>
            <div>
            <Top/>
            <Side/>
            <Switch>
            <Route component={(e)=>{
            // document.body.scrollTop =
            // document.documentElement.scrollTop = 0;
                return(<QuestionPage id={e.match.params.id}/>)}}
            path="/question:id" exact />

            <Route component={ask} 
            path="/ask" exact />
            
            <Route component={Reports} 
            path="/reportrater*^$" exact />

            <Route component={log} 
            path="/sign" exact />
            
            <Route component={()=><Addnote/>} 
            path="/addnote" exact />

            <Route path="/profile:id" component={(e)=>{
            // document.body.scrollTop =
            // document.documentElement.scrollTop = 0;
                 return <Profile name={e.match.params.id}/>
             }}  exact />

            <Route path="/Q&a:page" component={(e)=>{
            document.body.scrollTop =
            document.documentElement.scrollTop = 0;
                 return <Question page={e.match.params.page} />
             }}  exact />
             <Route path='/notes&:page' component={(e)=>{
                 return <Notes page={e.match.params.page}/>
             }} />
             <Route path='/note-info:id' component={(e)=>{
                 return <Note_info id={e.match.params.id}/>
             }} />
             <Route path='/Laws&:id' component={(e)=>{
                  return <Laws id={e.match.params.id}/>
              }}/>
              <Route path='/messages' component={()=>{
                  return <Message/>
              }}/>
              <Route path='/sendmessage$:id' component={(e)=>{
                  return <Sendmessage id={e.match.params.id}/>
              }}/>
             <Route path='/note&:id&:num' component={(e)=>{
                 document.body.scrollTop =
            document.documentElement.scrollTop = 474;
                 return <Note name={e.match.params.id} 
                     num={e.match.params.num}
                 />
             }} />
             <Route path="/Law:id&:page" component={(e)=>{
                 document.body.scrollTop =
                document.documentElement.scrollTop = 400;
                 return <Law name={e.match.params.id} 
                 page={e.match.params.page} />
             }}  exact />
             
             <Route component={()=>{
                 return (
                     <div>
                    <h1 style={{
                        textAlign:'center',
                        color:'red'

                    }}>404 Error page was not found</h1>
                    <h2 style={{
                        textDecoration:"none",
                        textAlign:'center',
                    }}> <Link 
                style={{color:'rgb(49, 226, 250)',
                textDecoration: 'none'}} to="/">back to main page</Link></h2>
                     </div>
                 )
             }}/>
            </Switch>
            </div>
            </BrowserRouter>
            )
    }
}


    ReactDOM.render(<Main/>,document.getElementById("id"));
    hide()
    