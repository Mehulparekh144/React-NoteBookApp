import React from 'react'
import { useContext } from 'react';
import '../styles/NoteItem.css' 
import NoteContext from '../context/notes/NotesContext';

function NoteItem(props) {
    const { note, updateNote , showAlert } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    return (
        <>
            <div className="col-md-3">

                <div className="card my-3" >
                    <div className="card-header rounded-0">
                        <h5 className="card-title">{note.title}</h5>
                    </div>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 ">{note.tag}</h6>
                        <p className="card-text">{note.description}</p>
                        <button onClick={() => {deleteNote(note._id);
                        showAlert("Note deleted successfully" , "success")}} style={{ border: "none", background: "none" }}><i class="fa-sharp fa-solid fa-trash"></i></button>
                        <button onClick = {() =>{updateNote(note)}}style={{ border: "none", background: "none" }}><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>

                </div>
            </div>



        </>
    )
}

export default NoteItem