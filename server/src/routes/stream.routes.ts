import { Router } from 'express';
import {
    createStream,
    getStream,
    getActiveStreams,
    updateStreamStatus
} from '../controllers/stream.controller';
const router: Router = require('express').Router();

// The order matters - put more specific routes first
router.get('/active', getActiveStreams);
router.post('/create/:ocid', createStream);
router.get('/:slug', getStream);
router.patch('/:id/status', updateStreamStatus);

module.exports = router;
