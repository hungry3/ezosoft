import dotenv from 'dotenv'
import { connectDB } from './src/Database/db.js'
import { app } from './app.js'
dotenv.config({
    path:"./.env"
})


const port = process.env.PORT || 8000

connectDB()
.then(() => {
    app.listen(port)
    console.log(`Server running on port ${port}`)
})
.catch((error) => {
    console.log(`Error connecting to MongoDB>>>>>>>> ${error.message}`)
})