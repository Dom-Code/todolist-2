import express from 'express';
import controllers from '../controllers/api';
import { LoginSchema, RegisterSchema, ValidateJoi } from '../middleware/joi';

const router = express.Router();
router.get('/', controllers.home);
router.get('/login', ValidateJoi(LoginSchema), controllers.login);
router.get('/register', ValidateJoi(RegisterSchema), controllers.register);
router.get('/logout', controllers.logout);

export default router;
