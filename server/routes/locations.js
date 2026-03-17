import express from 'express';
import LocationsController from '../controllers/locations.js';

const router = express.Router();

router.get('/', LocationsController.getLocations);
router.get('/:locationId', LocationsController.getLocation);

router.get('*path', (req, res) => {
  return res.status(404).json({ error: 'Page not found!' })
});



export default router;