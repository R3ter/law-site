var div = document.createElement("div");
var buttonsdiv = document.createElement("div");
var yes = document.createElement("BUTTON");
var no = document.createElement("BUTTON");
var btn = document.createElement("h1");
var p = document.createElement("h2");
const newdiv= document.body.appendChild(div)

const Confirm=(e,ptext,yescallback,nocallback)=>{
    div.style.display='block'
    
    yes.innerHTML='yes'
    no.innerHTML='no'
    btn.innerHTML=e
    if(p)
    p.innerHTML=ptext
    
    div.className='confirm'

    newdiv.appendChild(btn);
    newdiv.appendChild(p);

    newdiv.appendChild(buttonsdiv);
    buttonsdiv.appendChild(yes).onclick=()=>{
        div.style.display='none'
        try{
            yescallback(yes)
        }catch(e){
            console.log('no callback')
        }
    };
    buttonsdiv.appendChild(no).onclick=()=>{
        div.style.display='none'
        try{
            nocallback(no)
        }catch(e){}
    };

}

export default Confirm