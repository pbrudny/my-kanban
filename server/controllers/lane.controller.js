import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid/v4';

export function addLane(req, res) {
  console.log('REQ', req.body);
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lane: saved });
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
};

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      Note.remove({ "_id": { "$in": lane.notes } }).then(
        () => {
          res.status(200).end();
        }
      );
    });
  });
}

export function editLane(req, res) {
  Lane.update({ id: req.params.laneId }, req.body).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lane });
  });
}
