import React from "react";
import "./index.css"

function Note(props) {
  var note={title:props.title,content:props.content,id:props.id};
  function handleDelete() {
    props.onDelete(note);
  }
  var d = new Date();
 var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
 var nd = new Date(utc + (3600000*+5.5));
 console.log(nd.getMonth())
 var ist =  nd.getDate().toString()+"/"+(nd.getMonth()+1).toString()+"/"+nd.getFullYear().toString()
 var date=ist

  return (
    <div className="note">
      <p>{props.title}</p>
      <p>{props.content}</p>
      <div style={{display: "flex",
          flexDirection: "row"}}>
      <p style={{marginRight:"60rem",fontWeight:100,fontFamily: 'Shizuru'}}>{date}</p>
      <button onClick={handleDelete}>Edit</button>
      <button onClick={handleDelete}>DELETE</button>
      </div>
    </div>
  );
}

export default Note;
