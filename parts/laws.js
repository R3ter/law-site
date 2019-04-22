import React from 'react'
import io from 'socket.io-client'
import PageChanger from './pagechanger'
const socket=io()

class Law extends React.Component{
    constructor(e){
        super(e)
        

        socket.emit('file',e.name)
        this.change=this.change.bind(this)
        this.changeindex=this.changeindex.bind(this)
        this.searchresult=this.searchresult.bind(this)
        
        this.state={text:'',floor:1,roof:30
        ,laws:[],searcharray:null}

        socket.on('file',(e)=>{
            
            this.setState({text:e,laws:e.split(/\(\d+\)/g)},
                ()=>{
                document.getElementById('loading-law').style.display='none'
            })
            })
        socket.on('fileError',()=>{
            this.setState(()=>{
                document.getElementById('loading-law').style.display='none'
                return({error:true})
            })
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState(()=>{
            return({searcharray:null})
        })
    }
    change(e){
        e.preventDefault()
      const text=e.target.text.value
      if(text==''){
          this.setState(()=>{
              return({searcharray:null})
          }) 
          return  
      }
      const newarray=this.state.laws.filter((f)=>{
          return (f.includes(text))
      })
        this.setState(()=>{
            return({searcharray:newarray.map((e)=>{
            return{text:e,
            index:this.state.laws.indexOf(e)}
            })})
        })
    }
    
    changeindex(e){
        e.preventDefault()
        document.body.scrollTop =
        document.documentElement.scrollTop = 500;
        const text=e.target.number.value
        if(text==''){
            this.setState(()=>{
                return({searcharrayindex:null})
            }) 
            return
        }
       const indexsearch= this.state.laws.filter((f)=>{
           return(text==this.state.laws.indexOf(f))
        })
        this.setState(()=>{
            return({searcharray:indexsearch.map((e)=>{
            return{text:e,
            index:this.state.laws.indexOf(e)}
            })})
        })

    }
    searchresult(array){
        if(array.length==0){
            return(
                <div>
                    <h1>nothing was found</h1>
                </div>
            )
        }
        return(

            array.map((law)=>{
                return(
                   
                   <div>
                    <p className="lawnumber">مادة :{law.index}</p>
                    <p className="text">
                    {law.text}</p>
                    </div>
                   
                   )
            })
        )
    }
    render(){
       

        if(this.state.error){
            return(
                <div>
                    <h1>
                        error
                    </h1>
                </div>
            )
        }
        
        return (
            <div className='law'>
            
            <form onSubmit={this.change}>
            <input type="submit" value="search by text"/>
            <input type="text" placeholder="بحث بالقوانين"
             name='text' />
            </form>
            <form onSubmit={this.changeindex}>
            <input type="submit" value="search by number"/>
            <input type="number" placeholder="رقم المادة" 
                name="number"
            />
            </form>
            <h1 className="title">{this.state.text.split('\n')[0]}</h1>
            <div
                style={{position:'relative'}}
                 className="loading" id="loading-law"></div>
            {this.state.searcharray!=null?
            <div>
            {this.searchresult(this.state.searcharray)}
            </div>
            :
                <object>
             {   
                this.state.laws.slice((this.props.page-1)*30,
                    ((this.props.page)*30)+1).map((law)=>{
                    if(this.state.laws.indexOf(law)!=0){
                    return(
                        <div>
                        <p className="lawnumber">مادة :{
                            this.state.laws.indexOf(law)}
                            </p>
                        <p className="text">
                        {law}
                        </p>
                        </div>
                        )
                    }
                })
          }
            </object>}
            <PageChanger page={this.props.page} 
            length={this.state.laws.length}
              link={'/law'+this.props.name+'&'}/>
            </div>
        )
    }
}
export default Law