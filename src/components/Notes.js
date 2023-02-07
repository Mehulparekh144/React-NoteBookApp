import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NotesContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {

  const context = useContext(NoteContext);
  let navigate = useNavigate()
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/login")

    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", utitle: "", udescription: "", utag: "" })
  const handleClick = (e) => {
    editNote(note.id, note.utitle, note.udescription, note.utag)
    refClose.current.click()
    props.showAlert("Note updated !" , "success")


  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }
  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag })
  }

  return (

    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title " id="exampleModalLabel">Update Note</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <div className="row g-3">
                    <div className="col mb-3">
                      <input type="text" className="form-control" id="utitle" value={note.utitle} name='utitle' onChange={onChange} placeholder="Title" aria-label="utitle"  minLength={3}  required/>
                    </div>
                    <div className="col mb-3">
                      <input type="text" className="form-control" id="utag" value={note.utag} name='utag' onChange={onChange} placeholder="Tag" aria-label="utag" required/>
                    </div>
                  </div>

                  <textarea type="name" className="form-control" value={note.udescription} id="udescription" name='udescription' onChange={onChange} style={{ height: "100px" }} placeholder="Description" minLength={5}  required/>



                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline " ref={refClose} data-bs-dismiss="modal">Close</button>
              <button disabled={note.utitle.length < 3 || note.udescription.length < 5} type="button" className="btn " onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h3 className='heading'> Your Notes</h3>
      <div className="row mb-3">
        <div className='container' style={{ fontFamily: 'Rubik' , color:"#674188"}}>
          {notes.length === 0 && 'No Notes to Display'}

        </div>
        {notes.map((note) => {
          return <NoteItem key={note.id}  showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}




      </div>

    </>
  )
}

export default Notes