const userController = require('../controllers/userController');
const express = require('express');
const auth = require('../Middleware/Auth')

const router = express.Router();

router.post('/register',userController.userRegister);
router.post('/login', userController.userLogin);
router.get("/users", userController.getAllUsers);

router.put('/update', auth, userController.updateUser); // update own profile
router.delete('/delete', auth, userController.deleteUser); // delete own account

module.exports = router;