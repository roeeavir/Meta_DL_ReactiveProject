import express from 'express';

import {getLands, postLand} from '../controllers/lands.js';

import {getUsers, postUser} from '../controllers/users.js';

const router = express.Router();
// const Land = require('../models/site');


// router.get('/', getLands)
// router.post('/', postLand)

router.get('/', getUsers)
router.post('/', postUser)


export default router;