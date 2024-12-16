const express = require('express');
const { login,getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/login', login);


router.get('/:userId', getUsers);

module.exports = router;
