import React, { useState } from 'react';
import { registerUser } from '../api';

interface RegisterFormProps {
    onRegisterSuccess: (message: string) => void;
    onRegisterFailure: (message: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onRegisterFailure }) => {
    const [username, setUsername ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');

        try {
            const response = await registerUser(username, email, password);
            onRegisterSuccess('Registration successful');
            console.log("Response received", response);
        } catch (error) {
            onRegisterFailure('Registration failed');
            console.error("Error registering user", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg text-lg font-semibold">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
