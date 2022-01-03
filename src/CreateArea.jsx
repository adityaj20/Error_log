import React, { useState } from "react";

function CreateArea(props) {
  const [isExpanded, chngExpand] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note,setNote);
    if (note.title!=='' && note.content!==''){
    setNote({
      title: "",
      content: "",
    });}
   event.preventDefault();
  }

  function expanded() {
    chngExpand(true);
  }
  let previousLength = 0;

function handleBullet (event) {
  const bullet = "\u2022";
  const newLength = event.target.value.length;
  const characterCode = event.target.value.substr(-1).charCodeAt(0);
  const { name, value } = event.target;
  if (newLength > previousLength) {
    if (characterCode === 10) {
      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]:`${event.target.value}${bullet} `
        };
      });
    } else if (newLength === 1) {
      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]:`${bullet} ${event.target.value}`
        }});
      }
      else{
        const { name, value } = event.target;

        setNote((prevNote) => {
          return {
            ...prevNote,
            [name]: value,
          };
        });

      }
  }
  
  previousLength = newLength;
}

  return (
    <div>
      <form className="form">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          onClick={expanded}
          name="content"
          onChange={handleBullet}
          value={note.content}
          placeholder="Add a Soln..."
          rows={isExpanded?"4":"2"}
        />

        <button  onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
