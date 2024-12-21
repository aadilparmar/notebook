import React,{ useContext, useState } from 'react'
import NoteContext from "../context/notes/NoteContext";
const Addnote = () => {
    const context=useContext(NoteContext);
    const {addNote}=context;

    const [note,Setnote]=useState({title:"",description:"",tag:""})
    const onChange=(e)=>{
        Setnote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag,note.id);
        Setnote({title:"",description:"",tag:""});
    }
  return (
      <div className="container my-3">
      <h2>Add Your Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input    
          value={note.title}
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Add Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name='tag'
            value={note.ta}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={note.description}
            className="form-control"
            id="description"
            name='description'
            onChange={onChange}
          />
          
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  )
}

export default Addnote
