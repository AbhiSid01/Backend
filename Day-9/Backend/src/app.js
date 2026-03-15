const express = require("express")
const Note = require('./models/notes.model')
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.static("./public"))

app.post('/api/notes',async (req,res)=>{
   const  { title , description } = req.body;

   const note =await Note.create({
        title,description
   })
   
   res.status(201).json({
    message : "Note created Successfully!!",
    note
   })
})

app.get('/api/notes',async(req,res)=>{
    const notes = await Note.find()
    res.status(200).json({
        messgae: "Note fetched Successfully",
        notes
    })
})

app.delete('/api/notes/:id',async(req,res)=>{
    const id = req.params.id

    await Note.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note deleted successfully."
    })
})


app.patch('/api/notes/:id',async(req,res) =>{
    const id = req.params.id
    const { description } = req.body

    await Note.findByIdAndUpdate(id,{ description })

    res.status(200).json({
        message : "Note updated Successfully."
    })
})

app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname, "../public/index.html"));
})
module.exports = app