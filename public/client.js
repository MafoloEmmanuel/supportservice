document.addEventListener("DOMContentLoaded", ()=>{
    var errorMessage = document.querySelector(".warning");
 
    if(errorMessage.innerHTML !== ""){
 setTimeout(()=>{

        errorMessage.innerHTML= '';
    console.log('happy')
},5000)
} 
})