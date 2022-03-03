import express from 'express';

import {getUsers, registerUser,login} from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getUsers)
router.get('/:userName', login)
router.post('/', registerUser)

export default router;