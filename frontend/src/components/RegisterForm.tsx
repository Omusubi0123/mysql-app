import React, { useState } from 'react';
import { registerUser } from '../api';

interface RegisterFormProps {
    onRegisterSuccess: (message: string) => void;
    onRregisterFailure: (message: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onRregisterFailure }) => {
    const [username, setUsername ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');

        try {
            const response = await registerUser(username, email, password);
            console.log("Response received", response);
            onRegisterSuccess('Registration successful');
            setMessage('Registration successful');
        } catch (error) {
            onRregisterFailure('Registration failed');
            setMessage('Registration failed');
            console.error("Error registering user", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Rgister</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RegisterForm;
