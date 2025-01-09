// // import { useState } from 'react'
import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
    const host ="http://localhost:27480"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // get all Notes
    const getallNotes =async () => {
        //  TODO:aPI nULL
        const response=await fetch(`$(host)api/notes/fetchallnotes`, {
            method:'GET',
            headers :{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                //  'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            // body:JSON.stringify()

        });
        const json=await response.json();
        console.log(json)
        setNotes(json)
    }

    //Adda note 
    const addNote =async (title, description, tag) => {
        //  TODO:aPI nULL
        const response=await  fetch(`$(host)/api/notes/addnotes`, {
            method:'POST',
            headers :{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({title, description, tag})
            // body: JSON.stringify(data)
        });

        console.log("Adding a new notes")
        const note = {
            "_id": "671b1c76fe133e99a11614aba",
            "user": "67172e7cbfe4df3cedee0445",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-10-25T04:20:06.133Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // delet note 
    const deleteNote = (id) => {
        console.log("Deleting a note " + id);
        const newNote = notes.filter((note) => note._id !== id);
        setNotes(newNote);
    };

    // edit notes
    const editNote = async(id, title, description , tag) => {
        //APi call 
        const response=await fetch(`$(host)/api/notes/updatenotes/$(id)`, {
            method:'POST',
            headers :{
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxNWQ2NWJkN2QwOGFhMTE0N2YwNjMzIn0sImlhdCI6MTcyOTQ4NDQ2MX0.ZYsg4M8_SfEFVfdXHtb9jzsQT5NFdzWDITcOHiImjFs'
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({title, description, tag})
            // body: JSON.stringify(data)
        });
        // login to edit client
        for(let index=0; index < notes.length; index++){
            if(notes[index]._id === id){
                notes[index].title=title;
                notes[index].description=description;
                notes[index].tag=tag;
                setNotes([...notes]);
                return;
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes , addNote, deleteNote, editNote, setNotes ,getallNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;


