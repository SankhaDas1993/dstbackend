import app from './app.js'
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT;




const server = app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})
