import express from 'express';
import { employeeLogin, employeeForgotPassword, employeeResetPassword } from '../controllers/employeeAuthController.js';

const router = express.Router();

// Employee login
router.post('/employee-login', employeeLogin);
// Employee forgot password (request reset)
router.post('/employee-forgot-password', employeeForgotPassword);
// Employee reset password
router.post('/employee-reset-password', employeeResetPassword);

export default router;
