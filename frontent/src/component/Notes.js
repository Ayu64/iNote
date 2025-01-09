import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Update from './update/UpdateNote';
import { useNavigate } from 'react-router-dom';



// Profile

function Notes(props) {

  const context = useContext(noteContext)
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getallNotes();
    } else {
      navigate('/login')
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate]) // eslint-disable-next-line 
  

  const { notes, getallNotes, editNote } = context;
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });

  const ref = useRef(null);
  const refclose = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click();
    props.showAlert("Updated Successfully", "success")

  }

  // This function will open the modal when called
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tags
    })
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* <Model /> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <Update note={note} setNote={setNote} />
            </div>

            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 4 || note.edescription.length < 5} onClick={handleClick} type='button' className='btn btn-primary'> updateNote</button>
            </div>

          </div>
        </div>
      </div>

      
      <div className="row my-3">
        <h3>Your notes</h3>
        <div className="container mx-2">
          {notes.length === 0 && 'Notes out of range'}
        </div>
        {notes.map((note) => {
          return (
            <div key={note._id} className='col-md-3'>
              <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} />
            </div>
          );
        })}
      </div>

    </>
  )
}

export default Notes;


