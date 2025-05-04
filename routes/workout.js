const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getPublicWorkouts
} = require('../controllers/workout');

router.get('/getMyWorkouts', verifyToken, getWorkouts);
router.post('/addWorkout', verifyToken, createWorkout);
router.get('/:id', verifyToken, getWorkout);
router.put('/:id', verifyToken, updateWorkout);
router.delete('/:id', verifyToken, deleteWorkout);
router.get('/publicWorkouts', getPublicWorkouts); // Public route

module.exports = router;
