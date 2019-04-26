

const singout=()=>{

    document.cookie = "Username" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "id" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "pass" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.setItem('before','ask')
    window.location.href='./sign'
    hide()

}


export default singout