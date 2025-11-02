let token= sessionStorage.getItem('token')
//elements

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const dashboard = document.getElementById('dashboard');
const authSection = document.getElementById('auth');
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  token = null;
  dashboard.classList.add('hidden');
  authSection.classList.remove('hidden');
  loginForm.classList.replace('hidden', 'visible');
  registerForm.classList.replace('visible', 'hidden');
});

window.addEventListener('DOMContentLoaded', () => {
  if (token) {
    authSection.classList.add('hidden');
    loginForm.classList.replace('visible', 'hidden');
    dashboard.classList.remove('hidden');
    workoutList();
  } else {
    authSection.classList.remove('hidden');
    loginForm.classList.replace('hidden', 'visible');
    registerForm.classList.replace('visible', 'hidden');
    dashboard.classList.add('hidden');
  }
});
const apiBase = '/'

let isAuthenticating = false
const popup = document.getElementById("calendarPopup");
const datePicker = document.getElementById('datePicker');

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

//Get Logic
async function  getRequest(url){
    const res= await fetch(apiBase + url, {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
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
             authSection.classList.add('hidden');
             loginForm.classList.replace('visible', 'hidden');
             dashboard.classList.remove('hidden');
             await workoutList();
           }else{
            throw new Error('Failed to authenticate....')
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

//Finding and Setting Workout
/*async function workoutList(){
    console.log("workoutList() called")
const workoutInfo= document.getElementById("workoutInfo");
workoutInfo.innerHTML = ""; 
const today= new Date()
const dayIndex= today.getDay()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName= days[dayIndex]
console.log("Fetching workouts for:", dayName);
const data= await fetch(apiBase + `workouts/${dayName}`,{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
    }
})
console.log("Workout data received:", data);
 if(!data.ok) throw new Error("Request failed");
const jsonData= await data.json()

 const workouts = jsonData.getWorkout || [];

  if (workouts.length === 0) {
    workoutInfo.innerHTML = `<p>No workouts found for ${dayName}</p>`;
    return;
  }

workouts.forEach(work=>{
    const workBox= document.createElement('div')
    const workText= document.createElement('p')
    const workNotes= document.createElement('p')
    workText.innerText= work.name
    workNotes.innerText= work.notes
    workBox.appendChild(workText)
    workBox.appendChild(workNotes)
    workoutInfo.appendChild(workBox)
    //Delete workout option
    const Exercises= document.createElement('button')
    Exercises.innerText="Manage Exercises"
    Exercises.onclick=()=>{
        exerciseList()
    }   
})
}
*/


async function workoutList() {
  console.log("workoutList() called");

  const workoutInfo = document.getElementById("workoutInfo");
  workoutInfo.innerHTML = ""; // Clear old workouts

  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[today.getDay()];

  console.log("Fetching workouts for:", dayName);

  const response = await fetch(apiBase + `workouts/${dayName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  });

  console.log("Workout data received:", response);
  if (!response.ok) throw new Error("Request failed");


  const jsonData = await response.json();
  console.log("Parsed JSON data:", jsonData);


  const workouts = jsonData.getWorkout || [];

  if (workouts.length === 0) {
    workoutInfo.innerHTML = `<p>No workouts found for ${dayName}</p>`;
    return;
  }

  workouts.forEach(work => {
    const workBox = document.createElement('div');
    workBox.classList.add('workout-card');

    const workText = document.createElement('p');
    workText.innerText = work.workoutName;

    const workNotes = document.createElement('p');
    workNotes.innerText = work.notes;

    const Exercises = document.createElement('button');
    Exercises.innerText = "Manage Exercises";
    Exercises.onclick = () => {
      localStorage.setItem('currentWorkoutId', work.id);
      exerciseList();
    };

    workBox.appendChild(workText);
    workBox.appendChild(workNotes);
    workBox.appendChild(Exercises);
    workoutInfo.appendChild(workBox);
  });
}

async function workoutListForDate(dayName) {
  console.log("workoutListForDate() called for:", dayName);

  const workoutInfo = document.getElementById("workoutInfo");
  workoutInfo.innerHTML = ""; // Clear old workouts

  console.log("Fetching workouts for:", dayName);

  const response = await fetch(apiBase + `workouts/${dayName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  });

  console.log("Workout data received:", response);
  if (!response.ok) throw new Error("Request failed");


  const jsonData = await response.json();
  console.log("Parsed JSON data:", jsonData);


  const workouts = jsonData.getWorkout || [];

  if (workouts.length === 0) {
    workoutInfo.innerHTML = `<p>No workouts found for ${dayName}</p>`;
    return;
  }

  workouts.forEach(work => {
    const workBox = document.createElement('div');
    workBox.classList.add('workout-card');

    const workText = document.createElement('p');
    workText.innerText = work.workoutName;

    const workNotes = document.createElement('p');
    workNotes.innerText = work.notes;

    const Exercises = document.createElement('button');
    Exercises.innerText = "Manage Exercises";
    Exercises.onclick = () => {
      localStorage.setItem('currentWorkoutId', work.id);
      exerciseList();
    };

    workBox.appendChild(workText);
    workBox.appendChild(workNotes);
    workBox.appendChild(Exercises);
    workoutInfo.appendChild(workBox);
  });
}

//Creating new Workout
function openPopup(){
    document.getElementById('overlay').style.display = 'flex';
}

document.getElementById('workoutCreateBtn').addEventListener('click', async () => {
  try {
    let allvalid = validateForm(document.getElementById("overlay"));
    if (!allvalid) return;

    const day = document.getElementById('day').value;
    const workoutName = document.getElementById('workoutName').value;
    const workoutType = document.getElementById('workoutType').value;
    const notes = document.getElementById('workoutNotes').value;

    const response = await fetch(apiBase + 'workouts/workout_create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
      },
      body: JSON.stringify({ day, workoutName, workoutType, notes })
    });

    console.log("Workout create raw response:", response);
    const result = await response.json();
    console.log("Workout create JSON result:", result);
    if (!response.ok) {
      throw new Error(result.message || result.err || "Workout creation failed");
    }

    if(result.workoutId){
        //localStorage.setItem('currentWorkoutId', result.workoutId);
        console.log("Saved workoutId:", result.workoutId);
    }
 else {
  console.error("No workoutId returned:", result);
}

    alert("Workout created successfully!");
    closePopup();
    loadExercises();
  } catch (error) {
    console.error("Error creating workout:", error);
    alert(`❌ ${error.message}`);
  }
});

function closePopup() {
      document.getElementById('overlay').style.display = 'none';
        }

function closeExerciseListPopup() {
    document.getElementById('overlay_exercise_list').style.display = 'none';
}

function closeExercisePopup() {
    document.getElementById('overlay_exercise').style.display = 'none';
}


//Loading exercise names from database
async function loadExercises(){
    document.getElementById('overlay_exercise_list').style.display = 'none';
    document.getElementById('overlay_exercise').style.display ='flex';
    const response= await fetch(apiBase + 'workouts/exerciseData',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    })
    const jsonData = await response.json();
        const dropdown = document.getElementById('exerciseDropdown')
        dropdown.innerHTML = '<option value="">-- Select an exercise --</option>'; // Clear previous options
        jsonData.forEach(ex => {
            const option = document.createElement('option')
            option.value=ex.id
            option.textContent=ex.exerciseName
            dropdown.appendChild(option)
        });
    }

//Loading other data from the exercise
document.getElementById('exerciseDropdown').addEventListener('change',async (e)=>{
    const exerciseId = e.target.value;
    if(!exerciseId) return;
    const response= await fetch(apiBase + `workouts/exercises/${exerciseId}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    })
    const jsonData = await response.json();
    if(jsonData){
        document.getElementById('focusArea').value=jsonData.focusArea
        document.getElementById('Reps').value=jsonData.reps
        document.getElementById('Sets').value=jsonData.sets 
    }
} )

//Sending exercise data
document.getElementById("addExerciseBtn").addEventListener('click', async ()=>{
    try{
        let allValid= validateForm(document.getElementById("overlay_exercise"))
        if(!allValid) return;
    const workoutId = localStorage.getItem('currentWorkoutId');
    if (!workoutId) {
  alert("❌ No workout selected. Please create or select a workout first.");
  return;
}
    console.log("Loaded workoutId:", workoutId);

    const exerciseId = document.getElementById('exerciseDropdown').value;
    const exerciseName = document.getElementById('exerciseDropdown').options[document.getElementById('exerciseDropdown').selectedIndex].text;
    const reps= document.getElementById('Reps').value;
    const sets= document.getElementById('Sets').value;
    const focusArea= document.getElementById('focusArea').value;
    const weight=document.getElementById('Weight').value;
    const notes= document.getElementById('Notes').value;

    const response= await fetch(apiBase + 'workouts/exerciseLogs',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': token ? `Bearer ${token}`: undefined
        },
        body: JSON.stringify({
            workoutId,
            exerciseId,
            exerciseName,
            reps,
            sets,
            focusArea,
            weight,
            notes
        })
    })
        if (!response.ok) {
      throw new Error(result.message || "Sending Exercise data failed");
    }

    alert("Exercise added successfully!");
    closeExercisePopup();
    exerciseList(); // Refresh the exercise list

}
 catch (error) {
    console.error("Error creating Exercise:", error);
    alert(`❌ ${error.message}`);
  }
})

//Showing exercise data
async function exerciseList(){
    try{
    document.getElementById('overlay_exercise').style.display ='none';
    document.getElementById('overlay_exercise_list').style.display ='flex';
    const workoutId= localStorage.getItem('currentWorkoutId')
      console.log('workoutId from localStorage:', workoutId); 
    const response= await fetch(apiBase + `workouts/exerciseLogs/${workoutId}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : undefined
        }
     })
     if(!response.ok) {
        throw new Error(result.message || "Fetching Exercise data failed");
}

const data = await response.json()
console.log("Exercise logs data:", data);
const exerciseLogs = data.exerciseLogs || [];
if(exerciseLogs.length==0){
        alert("No exercise logs found for this workout.");
        return;
}
const exerciseAppend= document.getElementById('exerciseList')
exerciseAppend.innerHTML = '';// Clearing old Entries
exerciseLogs.forEach(ex=>{
    const listDiv= document.createElement('div')
    const exerciseName=document.createElement('p')
    exerciseName.textContent=ex.exerciseName
    listDiv.appendChild(exerciseName)
    exerciseAppend.appendChild(listDiv)
    //updateBtn
    //deleteBtn
})
    }
    catch(err){
        console.error("Error fetching exercise logs:", err);
        alert(`❌ ${err.message}`);
    }
}

//Date button
function seeDate(){
      popup.style.display=popup.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', (e)=>{
    if (!popup.contains(e.target) && e.target !== document.getElementById("calendarBtn")) popup.style.display = 'none';
})

datePicker.addEventListener('change', async ()=>{
    const selectedDate = datePicker.value;
    if(!selectedDate) return;
    const date = new Date(selectedDate)
    const dayIndex= date.getDay()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName= days[dayIndex]
    document.getElementById("calendarBtn").textContent= `${dayName}`;

    // Fetch workouts for the selected date
    await workoutListForDate(dayName);
})


