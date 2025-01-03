"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_controller_1 = require("../controllers/stream.controller");
const router = require('express').Router();
// The order matters - put more specific routes first
router.get('/active', stream_controller_1.getActiveStreams);
router.post('/create/:ocid', stream_controller_1.createStream);
router.get('/:slug', stream_controller_1.getStream);
router.patch('/:id/status', stream_controller_1.updateStreamStatus);
module.exports = router;
