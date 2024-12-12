const express = require('express');
const router = express.Router();

//mothods of functions in our user controller
const {getAllUsers, createUsers, getUserByid, updateUserById, deleteUserById} = require('../controllers/userController')

router.get('/', getAllUsers);
router.post('/', createUsers);
router.get('/:id', getUserByid);
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)
module.exports = router 