const express=require('express')
const mongoose=require('mongoose')
const app=express()
const route = require('./Routes/routes')
const {PORT,MONGOOSE_CONNECTION} = require('../config')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(MONGOOSE_CONNECTION,{useNewUrlParser:true})
.then( ()=>{console.log("MongoDb Connect...")})
.catch((err)=>{console.log(err.message)})


app.use('/',route)

app.listen(PORT||8000, ()=>{
    console.log('Express server listening on port: ' , PORT||8000)
})