import { Router } from "express";
import { changepassword, forgotPassword, getProfile,login,logout,register, updateUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";


const router = Router();

router.post('/register', upload.single("avatar") ,register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/changepassword', isLoggedIn, changepassword);
router.put('/update/:id',isLoggedIn, upload.single("avatar"),updateUser)

export default router;