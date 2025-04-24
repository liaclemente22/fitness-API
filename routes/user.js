const router = require('express').Router();
const { register, login, getProfile, updateProfile, deleteAccount } = require('../controllers/user');
const { verifyToken } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

router.get('/me', verifyToken, getProfile);
router.put('/me', verifyToken, updateProfile);
router.delete('/me', verifyToken, deleteAccount);

module.exports = router;
