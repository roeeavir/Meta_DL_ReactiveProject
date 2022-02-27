import express from 'express';

import {getLands} from '../controllers/lands.js';

const router = express.Router();
// const Land = require('../models/site');


router.get('/', getLands)

export default router;