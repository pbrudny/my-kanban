import Note from '../models/note';
import uuid from 'uuid/v4';
import Lane from '../models/lane';

export function addNote(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newNote = new Note(req.body);
  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      }).then(() => {
      res.json(saved);
    }).catch(error => console.log(error));
  });

  return res.status(200).end();
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    note.remove(() => {
      // TODO: remove orphaned ObjectId reference
      // Lane.findOne({ id: req.params.laneId })
      //   .then(lane => {
      //     return Lane.update( { id: lane.id }, { $pull: { "notes": req.params.noteId } });
      //   }).then(() => {
      //   res.status(200).end();
      // });
      res.status(200).end();
    });
  });
}
