const express = require("express")
const mongoose=require("mongoose");
const Note = require("./models/notes");
const notes=require("./models/notes")
const bodyParser = require("body-parser");
var cors = require("cors");

mongoose.connect("mongodb://localhost:27017/notes-mongoose",{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=>{
    const app=express();
    app.use(bodyParser.json())
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get("/notes",(req,res)=>{
    notes.find({}, (error, notes) => {
            res.json(notes)
          });
    })
    app.post("/notes",async (req,res)=>{
        // req.body=JSON.parse(req.body)
        // console.log(JSON.parse(Object.keys(req.body)[0]))
        // res.send(req.body)
        const {info,title,content}=JSON.parse(Object.keys(req.body)[0])
        if (info=="add"){
            const newNote=new Note({
                title:title,
                content:content
            })
            newNote.save(function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(info);
                  notes.find({}, (error, notes) => {
                    res.send(notes);
                  });
                }
              });
        }
        if (info=="delete"){
          await  notes
        .deleteOne({ title:title, content: content })
        .then(() => console.log("Note Deleted"));
notes.find({}, (error, notes) => {
        res.send(notes);
      });
        }
        // if(info=="edit"){
        //     notes
        //     .findOneAndUpdate({ title: title, content: content },{title:})
        //     .then(() =>
        //     console.log("Note Changed")
            
        //     );
        // }

        
    })
    app.listen(8000,()=>{
        console.log("server has started on port 8000")
    })
})
.catch((e)=>{
    console.log(e)
    console.log("Database Connection Failed")
})