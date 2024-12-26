import { Router } from 'express';
import {
    createStream,
    getStream
} from '../controllers/stream.controller';
const router: Router = require('express').Router();

// router.get('/user/:ocid', getUserStreamInformation);
router.get('/:slug', getStream);
router.post('/create/:ocid', createStream);

module.exports = router;
