import cors from 'cors'
import express from 'express'
import { Router } from 'express'
import jobRoutes from './controllers/jobRoutes.js'

const router = express.Router()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/job', jobRoutes)

app.get('', (req, res) => {
    res.send("Welcome to Jenkins Dashboard!")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Running on port " + PORT))