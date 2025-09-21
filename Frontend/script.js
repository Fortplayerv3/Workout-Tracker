let token= sessionStorage.getItem('token')
//elements
const apiBase = '/'

let isAuthenticating = false


//Registeration/login movement
const loginForm= document.getElementById('loginForm')
const registerForm= document.getElementById('registerForm')
document.getElementById('authBtn').addEventListener('click',()=>{
    loginForm.classList.replace("visible","hidden");
    registerForm.classList.replace("hidden","visible");
});

//Input validation
function validateForm(form){
    const inputs= form.querySelectorAll('input');
    for(let input of inputs) {
        if(!input.reportValidity()) return false;
    }
    return true;
}

//fetch logic
async function sendRequest(url,body){
    const res= await fetch(apiBase + url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
    if(!res.ok) throw new Error("Request failed");
    return res.json();
}

//error function
function showError(formType,message){
    const errorDiv= document.getElementById(
        formType === 'login' ? 'loginError': 'registerError'
    );
    if(errorDiv){
        errorDiv.innerText = message;
        errorDiv.style.display='block'
    }

}

//login
document.getElementById('loginBtn').addEventListener('click',async ()=>{
    let allValid = validateForm(loginForm)
      if (allValid) {
        //accessing email and pass login values
        const email= document.getElementById('loginEmail').value
        const password= document.getElementById('loginPassword').value 
        if(
           isAuthenticating|| 
           !email ||
           !password||
           password.length < 6 ||
           !email.includes('@')
           ){return }
           //error.style.display= 'none'
           isAuthenticating=true
           document.getElementById('loginBtn').innerText='Logging in...'

           try{
          const data = await sendRequest('auth/login',{email,password})
            if(data.token){
            token=data.token
            sessionStorage.setItem('token',token)
            loginForm.requestSubmit()

           // Redirect to workouts page or update UI(will write code here later)
           }else{
            throw Error('Failed to authenticate....')
           }
        }
           catch(err){
            showError('login',err.message)
           }
           finally{
            isAuthenticating=false
            document.getElementById('loginBtn').innerText='Login'
           }
   
  }

})
//Registring Users
document.getElementById('registerBtn').addEventListener('click',async ()=>{
   let allValid= validateForm(registerForm)
   if(allValid){
    
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        const registerEmail= document.getElementById('registerEmail').value
        const registerPassword= document.getElementById('registerPassword').value
        try{ 
            await sendRequest('auth/register',{
            firstName,
            lastName,
            email:registerEmail,
            password:registerPassword
        });
//Switch back to login after successful registration
    loginForm.classList.replace("hidden", "visible");
    registerForm.classList.replace("visible", "hidden");
   }
   catch(err){
    showError('register',err.message)
   }
}
});

document.getElementById('authBtn_two').addEventListener('click',()=>{
    registerForm.classList.replace("visible","hidden");
    loginForm.classList.replace("hidden","visible");
});

//Workout




