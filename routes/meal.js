const router = require('express').Router();
const {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
  getPublicMeals
} = require('../controllers/meal');
const { verifyToken } = require('../middleware/auth');

// Public route
router.get('/public', getPublicMeals);

// Authenticated user routes
router.get('/', verifyToken, getMeals);              
router.get('/:id', verifyToken, getMeal);           
router.post('/', verifyToken, createMeal);         
router.put('/:id', verifyToken, updateMeal);         
router.delete('/:id', verifyToken, deleteMeal);     

module.exports = router;
