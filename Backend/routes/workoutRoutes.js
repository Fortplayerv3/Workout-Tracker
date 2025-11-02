import express from 'express'
import Workout from '../../Database/models/workout.js'
import Exercises from '../../Database/models/exercise.js'
import exerciseLog from '../../Database/models/exerciselog.js'

const router = express.Router()

// Getting exercise name list from exercise.js
router.get('/exerciseData',async (req,res)=>{
    try{
     const exercises= await Exercises.findAll({
        attributes:['id', 'exerciseName']
     });
        res.status(200).json(exercises)
      }
    catch(err){
         res.status(500).json({err:err.message})
    }
})

// Getting Remaining exercise data
router.get('/exercises/:id', async(req,res)=>{
    try{
        const exercise= await Exercises.findByPk(req.params.id)
        res.json(exercise)
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})

//Displaying exerciseLog data
router.get('/exerciseLogs/:workoutId', async(req,res)=>{
    try{
        const exerciseLogs= await exerciseLog.findAll({
            where:{
                workoutId:req.params.workoutId
            }
        })
        return res.status(200).json({message:"Exercise logs found", exerciseLogs})
    }
    catch(err){
        console.error("fetching Exercise List Error:", err.message);
   return res.status(500).json({ error: err.message });
    }
})

//Starting point after login
router.get('/:date',async (req,res)=>{
// There should be a workout created, if not
try{
    const getWorkout = await Workout.findAll({
        where:{
            userId: req.userId,
            date:req.params.date
        }
    })
    if(getWorkout && getWorkout.length > 0){
        return res.status(200).json({message:"Workout found",getWorkout})
    }else{
         return res.status(404).json({ message: "No workout found for this date" });
    }
}
catch(err){
     console.error("Get workout error:", err.message);
   return res.status(500).json({ error: err.message });
}
})

// Creating a new workout
router.post('/workout_create', async (req,res)=>{
    try{
   const workout= await Workout.create({
        userId: req.userId,
        date: req.body.day,
        workoutName: req.body.workoutName,
        workoutType: req.body.workoutType,
        notes: req.body.notes
})
res.status(201).json({message:"Workout created", workoutId: workout.id})
    }
    catch(err){
        console.error("Post workout error:", err.message);
        res.status(500).json({err:err.message})
    }
    //displaying a newly created workout
})

// Creating exerciseLogs and storing them
router.post('/exerciseLogs', async (req,res)=>{
    try{
         const {workoutId, exerciseId, exerciseName, focusArea, reps, sets, weight, notes}= req.body
       const newExerciseLog= await exerciseLog.create({
            workoutId,
            exerciseId,
            exerciseName,
            focusArea,
            reps,
            sets,
            weight,
            notes
        })
        return res.status(201).json({message:"Exercise added", exerciseLog:newExerciseLog})
    }
    catch(err){
      console.error("Adding Exercise Error:", err.message);
   return res.status(500).json({ error: err.message });
    }
})

export default router
//Updating Exercise logs

//Deleting a exercise log

//deleting a workout
 
// An option to logout
// A streak to keep track of the number of workouts done in a row(optional)
