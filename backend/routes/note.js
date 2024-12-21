const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1 :Get all notes from User using get "api/note/fetchallnotes".login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//ROUTE 2 :Add new notes using post "api/note/addnotes". login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 1 }),
    body("description", "enter valid  description").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      //if there are errors return errors and the bad req
      const { title, description, tag } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array });
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
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//ROUTE 3 :Updating an existing notes using put"api/note/updatenotes". login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findOneAndUpdate(
      req.param.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//ROUTE 4 :deleting a existing note using delete"api/note/deletenote". login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findOneAndDelete(req.param.id);
    res.json({ Success: "Note has been deleted", note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
});
module.exports = router;
