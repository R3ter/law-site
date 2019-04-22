
var div = document.createElement("div");
var btn = document.createElement("h1");
var bt2 = document.createElement("h1");
var bt3 = document.createElement("h2");
bt2.style.color='green'

var link = document.createElement("p");

const newdiv= document.body.appendChild(div)

const info=(type,e,ptext)=>{
    div.style.display='block'
    if(type=='error'){
      bt2.innerHTML="&#9940;"
      div.className='tellwrorning'
    }else{
      bt2.innerHTML="✔"
      div.className='tellinfo'
    }
    btn.innerHTML=e
    
    

    newdiv.appendChild(bt2).style.margin="0rem";
    newdiv.appendChild(bt2).style.marginTop="5rem";
    newdiv.appendChild(btn);
    if(ptext){
      bt3.innerHTML=ptext
      newdiv.appendChild(bt3);
    }else{
      bt3.innerHTML=''
    }

    div.onclick=()=>{
    div.className='hidewindow'
    setTimeout(() => {
     div.style.display='none'
    }, 500);
    }
    if(ptext){
        const linkinfo= newdiv.appendChild(link)

          linkinfo.innerHTML=ptext.text
          linkinfo.onclick=()=>{
            ptext.onclick()
          }
      }
}

export default info