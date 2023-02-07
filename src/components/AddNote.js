import React, { useContext } from 'react'
import NoteContext from '../context/notes/NotesContext';
import { useState } from 'react';
import '../styles/AddNote.css'

function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note added successfully" , "success")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <>

            <h3 className='heading'> Add a note</h3>

            <form>
                <div className="mb-3">
                    <div class="row g-3">
                        <div class="col mb-3">
                            <input type="text" class="form-control" id="title" value={note.title} name='title' onChange={onChange} placeholder="Title" aria-label="title" minLength={3} required/>
                        </div>
                        <div class="col mb-3">
                            <input type="text" class="form-control" id="tag" value={note.tag} name='tag' onChange={onChange} placeholder="Tag" aria-label="Tag" required/>
                        </div>
                    </div>

                        <textarea type="name" class="form-control" value={note.description} id="description" name='description' onChange={onChange} style={{ height: "100px" }}  minLength={5} placeholder="Description" required/>


                </div>
                <button  disabled={note.title.length < 3 || note.description.length < 5}  type="submit" className="btn " onClick={handleClick}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote