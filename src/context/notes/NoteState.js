import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNote = [];
  const [notes, Setnotes] = useState(initialNote);
  //Get all notes
  const getNote = async() => {
    //Api Call
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3NWJmMzVhOTMzMWM0ZDE4ZDFlODdhIn0sImlhdCI6MTcxOTA4MTM3M30.yznNlI-KJdnkSAUSXqqWwcBrxDQYzsImgY7B_QmX5F0",
      } 
    });
    const  json=await response.json()
    console.log(json);
    Setnotes(json)
  };
  //Add a note
  const addNote = async(title,description,tag,id) => {
    //Api Call
    const response = await fetch(`${host}/api/note/addnote`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3NWJmMzVhOTMzMWM0ZDE4ZDFlODdhIn0sImlhdCI6MTcxOTA4MTM3M30.yznNlI-KJdnkSAUSXqqWwcBrxDQYzsImgY7B_QmX5F0",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note=await response.json()
    Setnotes((notes) => notes.concat(note)); 
    //Logic to add note
  };
  //Delete a note
  const deleteNote = async(id) => {
    //Api Call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method:"DELETE",
      headers: {
        "Content-Type":"application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3NWJmMzVhOTMzMWM0ZDE4ZDFlODdhIn0sImlhdCI6MTcxOTA4MTM3M30.yznNlI-KJdnkSAUSXqqWwcBrxDQYzsImgY7B_QmX5F0",
      }
    });
    const json=response.json();
    console.log(json)
    console.log("Deleting the note with the id"+id)
    const deltedNote = notes.filter((note) => {return note._id!==id;});
    Setnotes(deltedNote);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3NWJmMzVhOTMzMWM0ZDE4ZDFlODdhIn0sImlhdCI6MTcxOTA4MTM3M30.yznNlI-KJdnkSAUSXqqWwcBrxDQYzsImgY7B_QmX5F0",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json=response.json();
    console.log(json);
    //Edit in client
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].descriptions = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    Setnotes(newNotes); 
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote,editNote,getNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
