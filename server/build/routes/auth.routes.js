"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const router = require('express').Router();
router.get('/exist-user/:ocid', auth_controller_1.getUserIsExist);
router.get('/:ocid', auth_controller_1.getUserInformation);
router.post('/create', auth_controller_1.createUser);
module.exports = router;
