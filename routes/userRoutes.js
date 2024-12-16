const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

//mothods of functions in our user controller
const {getAllUsers, createUsers, getUserByid, updateUserById, deleteUserById, loginUser} = require('../controllers/userController')


router.post('/', createUsers);
router.post('/login', loginUser);

router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserByid);
router.put('/:id', protect, updateUserById)
router.delete('/:id', protect, deleteUserById)

module.exports = router 