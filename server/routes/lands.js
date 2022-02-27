import express from 'express';

import {getLands, postLand} from '../controllers/lands.js';

const router = express.Router();
// const Land = require('../models/site');


router.get('/', getLands)
router.post('/', postLand)

export default router;