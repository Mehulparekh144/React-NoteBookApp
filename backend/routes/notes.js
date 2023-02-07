const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get all the notes GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser,async (req, res) => {
    try {
        // console.log(req.user);
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
        console.log(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
});

// ROUTE 2 : Add a new note POST "/api/notes/addnote"
router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Enter valid title").isLength({ min: 3 }),
        body("description", "Description must have atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });

            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured");
        }
    }
);

// ROUTE 3 : Update an existing note PUT "/api/notes/updatenote"
router.put(
    "/updatenote/:id",
    fetchUser,
    async (req, res) => {
        const{title , description , tag} = req.body
        try {
            const newNote  = {};

            if (title){
                newNote.title = title
            }
            if (description){
                newNote.description = description
            }
            if (tag){
                newNote.tag = tag
            }

        let note = await Note.findById(req.params.id)
        if (!note){
            return res.status(404).send("Not found")
        }

        if (note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true})
        res.json({note});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured" );
        }
    }
);

// ROUTE 4 : Delete note delete "/api/notes/deleteNote"
router.delete( 
    "/deletenode/:id",
    fetchUser,
    async (req, res) => {
        try {

        let note = await Note.findById(req.params.id)
        if (!note){
            return res.status(404).send("Not found")
        }

        if (note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }


        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted" , "id" : req.params.id});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured");
        }
    }
);


module.exports = router
