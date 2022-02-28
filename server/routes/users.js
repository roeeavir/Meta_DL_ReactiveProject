import express from 'express';

import {getUsers, registerUser,login} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers)
router.get('/:userName', login)
router.post('/', registerUser)

export default router;