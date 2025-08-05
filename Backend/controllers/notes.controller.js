const noteModel = require("../models/notes.model");
const houseHoldModel = require("../models/houseHolds.models");
const { validationResult } = require("express-validator");

module.exports.view = async (req, res, next) => {
  const household_id = req.params.id;
  const notes = await noteModel.find({ household: household_id });
  res.status(200).json(notes);
};

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content } = req.body;
  const household = req.household;
  const user = req.user;

  const noteAlreadyExists = await noteModel.findOne({ content });

  if (noteAlreadyExists) {
    return res.status(400).json({ message: "Note already exists" });
  }

  const note = await noteModel.create({
    content,
    createdBy: user._id,
    household: household._id,
  });

  await houseHoldModel.findOneAndUpdate(
    {
      _id: household._id,
    },
    {
      $inc: { notescount: 1 },
    }
  );
  res.status(200).json(note);
};

module.exports.edit = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content } = req.body;
  const noteId = req.params.noteId;

  const note = await noteModel.findOneAndUpdate(
    { _id: noteId },
    { content },
    { new: true }
  );

  if (!note) {
    return res.status(400).json({ message: "Note does not exists" });
  }

  res.status(200).json(note);
};

module.exports.changePin = async (req, res, next) => {
  const noteId = req.params.noteId;

  const note = await noteModel.findByIdAndUpdate(
    noteId,
    [
      {
        $set: {
          pin: { $not: "$pin" },
        },
      },
    ],
    { new: true }
  );

  if (!note) {
    return res.status(400).json({ message: "Note does not exists" });
  }

  res.status(200).json(note);
};

module.exports.delete = async (req, res, next) => {
  const household = req.household;
  const noteId = req.params.noteId;

  const note = await noteModel.findOneAndDelete({ _id: noteId });

  if (!note) {
    return res.status(400).json({ message: "Note does not exists" });
  }

  console.log(household);

  await houseHoldModel.findOneAndUpdate(
    {
      _id: household._id,
    },
    {
      $inc: { notescount: -1 },
    }
  );

  res.status(200).json(note);
};
