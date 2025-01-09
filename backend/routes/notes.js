const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route: get all the notes using :GET "/api/notes/fetchalluser".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server errror')
    }
});


//Routes:2: add all the notes using : GET "api/auth/addnotes" .Login required 
router.post('/addnotes', fetchuser, [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //If there are error ,return bad reqrest and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save();

        res.json(saveNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server errror')
    }
});

//Route:3 Update an exixting Notes using :PUT"/api/auth/updatenotes".Login user 
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find  the to be updated 
    let note = await Note.findById(req.params.id);
    if (!note) { res.status(404).send('Not found') }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not authorized')
    }

    // const note = Note.findByIdAndUpdate();
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
});


//Route : 4 delete the existing notes ,DELETED :"/api/notes/delete:id" .Login user
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

        // Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        // Delete the note
        await Note.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Note has been deleted' });
        } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
