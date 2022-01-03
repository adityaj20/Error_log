const mongoose =require('mongoose');
// const notes = require('../data/notes');

const noteSchema = mongoose.Schema(
    {
        title:{
            type:String,
        },
        content:{
            type:String,
        },
    })
    const Note = mongoose.model("Note",noteSchema);

module.exports = Note;