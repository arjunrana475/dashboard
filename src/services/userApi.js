import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export async function getUsers() {
    const { data } = await API.get('/users');
    return data.users;
}

export async function createUser(userData) {
    const { data } = await API.post('/users', userData);
    return data.user;
}

export async function updateUser(id, userData) {
    const { data } = await API.put(`/users/${id}`, userData);
    return data.user;
}

export async function deleteUser(id) {
    await API.delete(`/users/${id}`);
}