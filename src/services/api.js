import axios from 'axios';

const API_URL = 'http://localhost:5000/profiles'; // json-server

export const getProfiles = () => axios.get(API_URL);
export const getProfileById = (id) => axios.get(`${API_URL}/${id}`);
export const createProfile = (data) => axios.post(API_URL, data);
export const updateProfile = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteProfile = (id) => axios.delete(`${API_URL}/${id}`);
