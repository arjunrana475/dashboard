
import axios from 'axios';

const AUTH_API = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
});

export async function registerUser(userData) {
    const { data } = await AUTH_API.post('/register', userData);
    return data;
}

export async function loginUser(credentials) {
    const { data } = await AUTH_API.post('/login', credentials);
    return data;
}
