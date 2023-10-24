import express from 'express';
import {signinn, signup} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signup); 
router.post('/signin', signinn); 

export default router;