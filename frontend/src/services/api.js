import axios from 'axios';
import { json } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return {
        headers: { Authorization: `${token}` },
    };
};

// Authentication endpoints

export const isLoggedIn = async () => {
    const headers = getAuthHeader();
    if(headers.headers.Authorization === 'null'){
        return null
    }
    else{
        try {
            const response = await axios.get(`${API_URL}/is-logged-in`, getAuthHeader());
            return response;
        } catch (error) {
            console.log(error);
            localStorage.removeItem("access_token");
            return null;
        }
    }
}

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {username, password});
        return response;
    } catch (error) {
        return error.response;
    }
};

export const logout = () => {
    try {
        localStorage.removeItem("access_token");
        return {
            "message": "Logout successful",
            "return_value": true
        };
    } catch (error) {
        return {
            "message": error,
            "return_value": false
        }
    }
};

export const forgotPassword = (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = (password) => {
    return axios.post(`${API_URL}/reset-password`, { password });
};

// User Profile
export const getUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateProfile = (userId, userData) => {
    return axios.put(`${API_URL}/users/${userId}`, userData, getAuthHeader());
};

export const deleteProfile = (userId) => {
    return axios.delete(`${API_URL}/users/${userId}`, getAuthHeader());
};

export const getUserDataForNavbar = () => {
    return axios.get(`${API_URL}/navbar`, getAuthHeader());
}

// Trips
export const getTrips = async () => {
    try {
        const response = await axios.get(`${API_URL}/trips`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getTrip = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const createTrip = async (tripData) => {
    try {
        const response = await axios.post(`${API_URL}/trips`, tripData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateTrip = async (tripId, tripData) => {
    try {
        const response = await axios.put(`${API_URL}/trips/${tripId}`, tripData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteTrip = async (tripId) => {
    try {
        const response = await axios.delete(`${API_URL}/trips/${tripId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};


// Trip Members endpoint

export const getTripMembers = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}/trip-members`, getAuthHeader());
};

// Invitation endpoints

export const sendInvite = (tripId, inviteeId) => {
    return axios.post(`${API_URL}/trips/${tripId}/invitations`, { inviteeId }, getAuthHeader());
};

export const acceptInvite = (invitationId) => {
    return axios.put(`${API_URL}/invitations/${invitationId}`, {}, getAuthHeader());
};

export const declineInvite = (invitationId) => {
    return axios.delete(`${API_URL}/invitations/${invitationId}`, {}, getAuthHeader());
};

// Destination endpoints

export const addDestination = async (tripId, destinationData) => {
    try {
        const response = await axios.post(`${API_URL}/trips/${tripId}/destinations`, destinationData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getDestinations = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}/destinations`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
}

export const updateDestination = async (destinationId, destinationData) => {
    try {
        const response = await axios.put(`${API_URL}/destinations/${destinationId}`, destinationData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteDestination = async (destinationId) => {
    try {
        const response = await axios.delete(`${API_URL}/destinations/${destinationId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

// Activity endpoints

export const addActivity = (tripId, activityData) => {
    return axios.post(`${API_URL}/trips/${tripId}/activities`, activityData, getAuthHeader());
};

export const getActivities = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}/activities`, getAuthHeader());
}

export const updateActivity = (activityId, activityData) => {
    return axios.put(`${API_URL}/activities/${activityId}`, activityData, getAuthHeader());
};

export const deleteActivity = (activityId) => {
    return axios.delete(`${API_URL}/activities/${activityId}`, getAuthHeader());
};


// Transport endpoints

export const addTransport = (tripId, transportData) => {
    return axios.post(`${API_URL}/trips/${tripId}/transports`, transportData, getAuthHeader());
};

export const getTransports = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}/transports`, getAuthHeader());
}

export const updateTransport = (transportId, transportData) => {
    return axios.put(`${API_URL}/transports/${transportId}`, transportData, getAuthHeader());
};

export const deleteTransport = (transportId) => {
    return axios.delete(`${API_URL}/transports/${transportId}`, getAuthHeader());
};


// Accommodation endpoints

export const addAccommodation = (tripId, accommodationData) => {
    return axios.post(`${API_URL}/trips/${tripId}/accommodations`, accommodationData, getAuthHeader());
};

export const getAccommodations = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}/accommodations`, getAuthHeader());
}

export const updateAccommodations = (accommodationId, accommodationData) => {
    return axios.put(`${API_URL}/accommodations/${accommodationId}`, accommodationData, getAuthHeader());
};

export const deleteAccommodations = (accommodationId) => {
    return axios.delete(`${API_URL}/accommodations/${accommodationId}`, getAuthHeader());
};


// PackingList endpoints

export const addPackingList = (tripId, packingListData) => {
    return axios.post(`${API_URL}/trips/${tripId}/packing-lists`, packingListData, getAuthHeader());
};

export const getPackingLists = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}/packing-lists`, getAuthHeader());
}

export const updatePackingList = (packingListId, packingListData) => {
    return axios.put(`${API_URL}/packing-lists/${packingListId}`, packingListData, getAuthHeader());
};

export const deletePackingList = (packingListId) => {
    return axios.delete(`${API_URL}/packing-lists/${packingListId}`, getAuthHeader());
};


// Expense endpoints

export const addExpense = (tripId, expenseData) => {
    return axios.post(`${API_URL}/trips/${tripId}/expenses`, expenseData, getAuthHeader());
};

export const getExpenses = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}/expenses`, getAuthHeader());
};

export const updateExpense = (expenseId, expenseData) => {
    return axios.put(`${API_URL}/expenses/${expenseId}`, expenseData, getAuthHeader());
};

export const deleteExpense = (expenseId) => {
    return axios.delete(`${API_URL}/expenses/${expenseId}`, getAuthHeader());
};


// Expense split endpoints

export const splitExpense = (expenseId, split_with) => {
    return axios.post(`${API_URL}/expenses/${expenseId}/split`, { split_with }, getAuthHeader());
};