const router = require('express').Router();
const { register, login, getProfile, updateProfile, deleteAccount } = require('../controllers/user');
const { verifyToken } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

router.get('/myprofile', verifyToken, getProfile);
router.put('/updateMyProfile', verifyToken, updateProfile);
router.delete('/deleteProfile', verifyToken, deleteAccount);

module.exports = router;
