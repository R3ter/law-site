
const Currenttime=(date,socket)=>{

  if(newdate.getFullYear()-date.year>0){
      date=newdate.getFullYear()-date.year+' year ago'
  }else if(parseInt(newdate.getfullyear)-date.month>0){
      date=parseInt(newdate.getfullmonth)-date.month+' months ago'
  }else if(parseInt(newdate.getday)-date.day>0){
      date=parseInt(newdate.getday)-date.day+' days ago'
  }else if(parseInt(newdate.gethours)-date.hour>0){
      date=parseInt(newdate.gethours)-date.hour+' hours ago'
  }else if(parseInt(newdate.getmins)-date.min>0){
      date=parseInt(newdate.getmins)-date.min+' mins ago'
  }else{
      date='just now'
  }
  
    socket.emit("gettime",date)
  
}
module.exports= Currenttime