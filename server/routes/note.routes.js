import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router({mergeParams: true});

// Add a new Note
router.route('/notes').post(NoteController.addNote);

export default router;
