const express = require("express");
const Note = require('./models/notes.model')

const app = express();
app.use(express.json());


app.post('/notes',async(req,res)=>{
    const { title,description } = req.body;
    const note = await Note.create({
        title,description
    })

    res.status(201).json({
        message:"Note created Successfully!!",
        note
    })
})


app.get('/notes',async(req,res)=>{
    const notes =await Note.find()
    res.status(200).json({
        msg:"Note fetched Successfully",
        notes

    })
})





module.exports = app;