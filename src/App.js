import logo from './logo.svg'
import Navbar from './Navbar.jsx'
import CreateArea from './CreateArea';
import Note from './Note';
import { useState, useEffect } from 'react'
//  function getAllNotes(setNotes){
//     await fetch("http://127.0.0.1:8000/notes")
//     .then(response => response.json())
//     .then(res => {
//       console.log("here")
//      return res
//       })
// }
function App() {
  var prev_notes={}
  const [allNotes, setNotes] = useState([]);
  useEffect(()=>{
    async function fetchdata(){
    var response= await fetch("http://127.0.0.1:8000/notes")
    console.log(response)
    response = await response.json()
    console.log(response)
    console.log("here")
    return response}
    const response=fetchdata()
    response.then((res)=>{
      console.log(res)
      setNotes((prev)=>{
        if (prev!==res){
          return res
        }
      })
    })}
  ,[])
  async function addNote(note,setNote){
    if (note.title && note.content){
    const data={info:"add",title:note.title,content:note.content}
    // allNotes.append(note)
    console.log(data)
    await fetch("http://127.0.0.1:8000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setNotes(res);
      })
    // setNotes((prev_notes)=>{
    //   return(
    //     [...prev_notes,note]
    //   )
    // })
  }
  else{
    window.confirm('Plz fill the required fields')
      setNote((prev)=>{
      console.log("ctyvubhjk",prev)
    return prev
    })
    
  }}
  
  async function deleteNote(note){
    const data={info:"delete",title:note.title,content:note.content}
    window.confirm('Are you sure you wish to delete this item?')  
    ? await fetch("http://127.0.0.1:8000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("hello",res);
        setNotes(res);
      })
      : setNotes((prev_notes)=>{
    return [...prev_notes]
})
   
  }
  console.log(allNotes)
  return (
      <div style={{backgroundColor:"linear-gradient(bottom,#77c795, #5de882)"}}>
        <Navbar/>
        <CreateArea onAdd={addNote} />
        {allNotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
  );
}

export default App;
