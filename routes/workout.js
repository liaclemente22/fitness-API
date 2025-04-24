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

router.get('/', verifyToken, getWorkouts);
router.post('/', verifyToken, createWorkout);
router.get('/:id', verifyToken, getWorkout);
router.put('/:id', verifyToken, updateWorkout);
router.delete('/:id', verifyToken, deleteWorkout);
router.get('/public', getPublicWorkouts); // Public route

module.exports = router;
