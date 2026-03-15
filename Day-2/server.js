const express = require("express");
// we are not using import even though it is latest because
//  Older Node.js versions supported it by default
// Huge ecosystem already written using it
// Works without extra configuration
const app = express()  //server instance create krna

app.get('/',(req,res) =>{
    res.send("Hello World");
})

app.get('/about',(req,res)=>{
    res.send("This is about page");
})

app.get('/course',(req,res) =>{
    res.send("This is course page");
})

app.listen(3000)   // server start krna