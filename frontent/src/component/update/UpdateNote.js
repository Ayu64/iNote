import React, { useContext } from 'react'
import noteContext from '../../context/notes/noteContext';
function Update({ note, setNote }) {

  const context = useContext(noteContext)
  const { editNote } = context;

  const onChange = (e) => {
   
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle}
            onChange={onChange} minLength ={4} required />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label" value={note.edescription} >description</label>
          <input type="text" className="form-control" id="edescription" name='edescription'
            onChange={onChange} minLength ={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label" value={note.etag} >Tag</label>
          <input type="text" className="form-control" id="etag" name='etag'
            onChange={onChange} />
        </div>
      </form>
    </div>
  )
}

export default Update;
