"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_controller_1 = require("../controllers/stream.controller");
const router = require('express').Router();
// router.get('/user/:ocid', getUserStreamInformation);
router.get('/:slug', stream_controller_1.getStream);
router.post('/create/:ocid', stream_controller_1.createStream);
module.exports = router;
