import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNote ,editNote } = context;
  useEffect(() => {
    getNote();
    // eslint-disable-next-line 
  }, []);
  const [note, Setnote] = useState({id:"", etitle: "", edescription: "", etag: "" });
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    Setnote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const onChange = (e) => {
    Setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    console.log("updating note....", note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
  };
  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Add Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Cancel
              </button>
              <button
                disabled={note.etitle.length<5 || note.edescription.length<5}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="row my-2">
          <h2>Your Notes</h2>
          <div className="container">
            {notes.length===0 && 'No notes to be Displayed Add a Note'}
          </div>
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};
export default Notes;
