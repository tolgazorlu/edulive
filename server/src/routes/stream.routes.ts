import { Router } from 'express';
import {
    createStream,
} from '../controllers/stream.controller';
const router: Router = require('express').Router();

// router.get('/user/:ocid', getUserStreamInformation);
router.post('/create/:ocid', createStream);

module.exports = router;
