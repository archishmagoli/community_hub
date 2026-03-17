import express from 'express';
import EventsController from '../controllers/events.js';

const router = express.Router();

router.get('/', EventsController.getEvents);
router.get('/:eventId', EventsController.getEvent);

router.get('*path', (req, res) => {
  return res.status(404).json({ error: 'Page not found!' })
});



export default router;