import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';



function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;


    const onClick = (note) => {
        // no-unused-vars
        // editNote(note); 
        updateNote(note._id, note.title, note.description, note.tag);
    }
    return (
        <div>
            {/* {note.title}
            {note.description} */}

            <div className="">
                <div className="card my-2">
                    <div className="card-body ">
                        <div className='d-flex align-items-center' >
                            <h5 className="card-title">{note.title}</h5>
                            <i
                                className="fa-solid fa-trash mx-2"
                                onClick={() => {
                                    deleteNote(note._id); // Updated to match function name
                                    props.showAlert("Deleted successfully ", "success")
                                }}
                            ></i>

                            <i
                                className="fa-solid fa-pen-to-square mx-2"
                                onClick={() => updateNote(note)}
                            ></i>
                        </div>
                        <p className="card-text"> {note.description} </p>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default NoteItem