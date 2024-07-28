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

export const getTripMembers = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}/trip-members`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getPendingInvitations = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}/pending-invitations`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

// Invitation endpoints

export const getUserInvitations = async () => {
    try {
        const response = await axios.get(`${API_URL}/invitations`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};


export const sendInvite = async (tripId, inviteeUsername) => {
    try {
        const response = await axios.post(`${API_URL}/trips/${tripId}/invitations`, { "invitee_username": inviteeUsername }, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const acceptInvite = async (invitationId) => {
    try {
        const response = await axios.put(`${API_URL}/invitations/${invitationId}/accept`, {}, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const declineInvite = async (invitationId) => {
    try {
        const response = await axios.delete(`${API_URL}/invitations/${invitationId}/decline`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
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

export const addActivity = async (tripId, activityData) => {
    try {
        const response = await axios.post(`${API_URL}/trips/${tripId}/activities`, activityData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getActivities = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}/activities`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
}

export const updateActivity = async (activityId, activityData) => {
    try {
        const response = await axios.put(`${API_URL}/activities/${activityId}`, activityData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteActivity = async (activityId) => {
    try {
        const response = await axios.delete(`${API_URL}/activities/${activityId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};


// Transport endpoints

export const addTransport = async (tripId, transportData) => {
    try {
        const response = await axios.post(`${API_URL}/trips/${tripId}/transports`, transportData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getTransports = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}/transports`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
}

export const updateTransport = async (transportId, transportData) => {
    try {
        const response = await axios.put(`${API_URL}/transports/${transportId}`, transportData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteTransport = async (transportId) => {
    try {
        const response = await axios.delete(`${API_URL}/transports/${transportId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};


// Accommodation endpoints

export const addAccommodation = async (tripId, accommodationData) => {
    try {
        const response = await axios.post(`${API_URL}/trips/${tripId}/accommodations`, accommodationData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getAccommodations = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}/accommodations`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
}

export const updateAccommodation = async (accommodationId, accommodationData) => {
    try {
        const response = await axios.put(`${API_URL}/accommodations/${accommodationId}`, accommodationData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteAccommodation = async (accommodationId) => {
    try {
        const response = await axios.delete(`${API_URL}/accommodations/${accommodationId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};


// PackingList endpoints

export const addPackingList = async (tripId, packingListData) => {
    try {
        const response = await axios.post(`${API_URL}/trips/${tripId}/packing-lists`, packingListData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getPackingLists = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}/packing-lists`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
}

export const updatePackingList = async (packingListId, packingListData) => {
    try {
        const response = await axios.put(`${API_URL}/packing-lists/${packingListId}`, packingListData, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deletePackingList = async (packingListId) => {
    try {
        const response = await axios.delete(`${API_URL}/packing-lists/${packingListId}`, getAuthHeader());
        return response;
    } catch (error) {
        return error.response;
    }
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