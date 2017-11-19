import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();
import noteRouter from './note.routes';

// Get all Lanes
router.route('/lanes').get(LaneController.getLanes);

// Add a new Lane
router.route('/lanes').post(LaneController.addLane);

router.route('/lanes/:laneId').delete(LaneController.deleteLane);

router.use('/lanes/:lanedId', noteRouter);

export default router;
