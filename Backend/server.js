import express from 'express'
import path , { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'
import middleware from './middleware/middleware.js'

const app = express()
const PORT = process.env.PORT || 3000

const __filename= fileURLToPath(import.meta.url);
const __dirname= dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname,'../Frontend')));

app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
})

//Routes
app.use('/auth',authRoutes);
app.use('/workouts',middleware,workoutRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})