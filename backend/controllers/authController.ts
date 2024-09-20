import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/connection';
import { RowDataPacket } from 'mysql2';


export const registerUser = async (req: Request, res: Response) => {
    console.log("Register user called");
    const { username, email, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hasedPassword]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    console.log("Login user called");
    const { email, password } = req.body;

    try {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0] as any;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login sucessful', token });
    } catch (error) {
        console.error("Error logging in", error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};
