require('dotenv').config() 
const connectdb= require('./config/db.js')
const express = require('express')
const app= express();
const port =process.env.PORT || 5000;
connectdb();
app.get('/',(req,res)=>{
    res.send('API is running')
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})