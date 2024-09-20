import React, { useState } from 'react';
import { loginUser } from '../api';

interface LoginFormProps {
    onLoginSuccess: (token: string) => void;
    onLoginFailure: (message: string) => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginFailure}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            const response = await loginUser(email, password);
            console.log("Response received", response);
            onLoginSuccess(response.data.token);
            setMessage('Login successful');
        } catch (error) {
            onLoginFailure('Login failed');
            setMessage('Login failed');
            console.error("Error logging in", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
};


export default LoginForm;

