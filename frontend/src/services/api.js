import axios from axios;

const API_URL = 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return {
        headers: { Authorization: `${token}` },
    };
};

// Authentication endpoints

export const signup = (user_data) => {
    return axios.post(`${API_URL}/signup`, user_data);
};

export const login = (username, password) => {
    return axios.post(`${API_URL}/login`, {
        "username": username,
        "password": password
    });
};

export const logout = () => {
    try {
        localStorage.removeItem("access_token");
        return JSON({
            "message": "Logout successful",
            "return_value": true
        });
    } catch (error) {
        return JSON({
            "message": error,
            "return_value": true
        })
    }
};

export const updateProfile = (user_data) => {
    return axios.put(`${API_URL}/users/${user_data['user_id']}`, user_data, getAuthHeader());
};

export const deleteProfile = (user_data) => {
    return axios.delete(`${API_URL}/users/${user_data['user_id']}`, getAuthHeader());
};

// User Profile
export const getUserProfile = (user_id) => {
    return axios.get(`${API_URL}/users/${user_id}`, getAuthHeader());
};

// Trips
export const getTrips = () => {
    return axios.get(`${API_URL}/trips`, getAuthHeader());
};

export const getTrip = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}`, getAuthHeader());
};

export const createTrip = (tripData) => {
    return axios.post(`${API_URL}/trips`, tripData, getAuthHeader());
};

export const updateTrip = (tripId, tripData) => {
    return axios.put(`${API_URL}/trips/${tripId}`, tripData, getAuthHeader());
};

export const deleteTrip = (tripId) => {
    return axios.delete(`${API_URL}/trips/${tripId}`, getAuthHeader());
};

// Invitation endpoints



// Destination endpoints



// Activity endpoints



// Transport endpoints



// Accommodation endpoints



// Expense endpoints



// PackingList endpoints