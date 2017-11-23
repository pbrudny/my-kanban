import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();
import noteRouter from './note.routes';

router.route('/lanes').get(LaneController.getLanes);
router.route('/lanes').post(LaneController.addLane);
router.route('/lanes/:laneId').delete(LaneController.deleteLane);
router.route('/lanes/:laneId').put(LaneController.editLane);
router.use('/lanes/:laneId', noteRouter);

export default router;
