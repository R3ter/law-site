
const path=require("path")
const file=require('fs')
let img=''
const ObjectID=require('mongodb').ObjectID

const succ=(id,data,socket)=>{
let likes=0
let likesask=0
let best=0
let answers=0
if(id.e.name=='5cb9b96c02d8571774e83f1c'&&
id.username!='adminwaleedisadmin'){
    socket.emit('usernotfound')
    return
}
    if(ObjectID.isValid(id.e.name))
    id.id = new ObjectID(id.e.name)
    data.db().collection('accounts').findOne({_id:id.id},
        (error,result)=>{
        if(error){
            console.error(error)
        }else if(result){
            data.db().collection('newshit').find(
                {name:result.username}).toArray((error,resulte)=>{
                    if(error){
                        console.error(error)
                    }else{
                        resulte.map((e)=>{
                            
                           likesask=(e.likesnames.length-
                            e.dislikesnames.length)+likesask
                        })
                        try{
                        img=file.readFileSync(path.join(__dirname,'..'
                        ,"profileimg",(result._id)+'.png'))
                        }catch(e){
                        img=file.readFileSync(path.join(__dirname,'..','img','law.png'))
                        }
                        data.db().collection('comments').find(
                            {name:result.username}).toArray(
                                (error,res)=>{
                                    if(error){
                                        console.error(error)
                                    }else{
                                        res.map((e)=>{
                                            answers=answers+1;
                                           likes=(e.likesnames.length
                                           -e.dislikesnames.length)
                                            +likes
                                           
                                        })
                                    }
                            })
                            data.db().collection('newshit').find({
                                answerer:id.username
                            }).toArray((e,r)=>{
                                try{
                                best=r.length
                                socket.emit('userinfo',{
                                    name:result.username,
                                    likesask:likesask,
                                    comments:answers,
                                    bests:best,
                                    img:img
                                    ,lastseen:result.last,
                                    likes:likes,questions:resulte.length
                                })
                            }catch(e){
                                console.log(e)
                                socket.emit('userinfoerror')
                            }
                        })
                    }
                })

            
        }else{
            socket.emit('usernotfound')
        }
    })

}

module.exports=succ