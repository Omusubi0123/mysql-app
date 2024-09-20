import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;


// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// const router = express.Router();
// const secretKey = 'yoshiyoshiScret000112';


// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     res.status(201).send('User registered');
// });


// router.post('/login', async (requestAnimationFrame, res) => {
//     const { username, password } = requestAnimationFrame.body;


// })