const Currenttime=(newdate,date)=>{
    
    if(!newdate){
        return 'calculating'
    }
    if(!date){
        return 'calculating'
    }

        if(newdate.getfullyear-date.year>0){
            date=newdate.getfullyear-date.year+' year ago'
        }else if(parseInt(newdate.getfullmonth)-date.month>0){
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
        return date
      
    }
    export default Currenttime