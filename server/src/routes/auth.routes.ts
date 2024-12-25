import { Router } from 'express';
import {
    createUser,
    getUserInformation,
    getUserIsExist,
} from '../controllers/auth.controller';
const router: Router = require('express').Router();

router.get('/exist-user/:ocid', getUserIsExist);
router.get('/:ocid', getUserInformation);
router.post('/create', createUser);

module.exports = router;
