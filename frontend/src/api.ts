import axios from 'axios';

export const registerUser = (username: string, email: string, password: string) => {
    return axios.post('http://localhost:5000/api/auth/register', { username, email, password });
};

export const loginUser = (email: string, password: string) => {
    return axios.post('http://localhost:5000/api/auth/login', { email, password });
};
