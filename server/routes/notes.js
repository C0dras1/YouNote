const express = require('express');
const router = express.Router();

const Note = require('../models/note');
const User = require('../models/user');

const SaveNote = (note, res) => {
  note
    .save()
    .then(note => res.json(note))
    .catch(() => res.status(400).json({msg: "Error: Could not save the note."}));
};

router.get("/". (req, res) => {
  Note.find({author: req.username.username})
    .then(notes => {
      res.json(notes);
    }).catch(err => res.json({msg: "Could not find notes for that user."}));
});

router.post("/", (req, res) => {
  const {title, body, videoLink, videoTimestamp} = req.body;

  let note = new Note({
    title,
    body: JSON.parse(body),
    author: req.username.username,
    videoLink,
    videoTimestamp
  });
  SaveNote(note, res);
})

router.put("/:id", (req, res) => {
  const {title, body, videoLink, videoTimestamp} = req.body;
  Note.findById(req,params.id)
    .then(note => {
      note.title = title,
      note.body = JSON.parse(body),
      note.videoLink = videoLink,
      note.videoTimestamp = videoTimestamp
      SaveNote(note, res)
    }).catch(() => res.json({msg: "No note found with that ID."}));
});

router.delete("/:id", (req, res) => {
  Note
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Note Deleted!"))
    .catch(() => res.json({msg: "Could not find note to delete."}))
});