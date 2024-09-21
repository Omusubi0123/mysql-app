import React, { useState } from 'react';
import { loginUser } from '../api';

interface LoginFormProps {
    onLoginSuccess: (token: string) => void;
    onLoginFailure: (message: string) => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginFailure}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            const response = await loginUser(email, password);
            onLoginSuccess(response.data.token);
            console.log("Response received", response);
        } catch (error) {
            onLoginFailure('Login failed');
            console.error("Error logging in", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg text-lg font-semibold">
                Login
            </button>
        </form>
    );
};


export default LoginForm;

