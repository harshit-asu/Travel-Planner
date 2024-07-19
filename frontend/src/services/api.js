import axios from axios;

const API_URL = 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return {
        headers: { Authorization: `${token}` },
    };
};

// Authentication endpoints

export const signup = (userData) => {
    return axios.post(`${API_URL}/signup`, userData);
};

export const login = (username, password) => {
    return axios.post(`${API_URL}/login`, {username, password});
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

export const forgotPassword = (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = (password) => {
    return axios.post(`${API_URL}/reset-password`, { password });
};

// User Profile
export const getUserProfile = (userId) => {
    return axios.get(`${API_URL}/users/${userId}`, getAuthHeader());
};

export const updateProfile = (userId, userData) => {
    return axios.put(`${API_URL}/users/${userId}`, userData, getAuthHeader());
};

export const deleteProfile = (userId) => {
    return axios.delete(`${API_URL}/users/${userId}`, getAuthHeader());
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

export const addDestination = (tripId, destinationData) => {
    return axios.post(`${API_URL}/trips/${tripId}/destinations`, destinationData, getAuthHeader());
};

export const getDestinations = (tripId) => {
    return axios.get(`${API_URL}/trips/${tripId}/destinations`, getAuthHeader());
}

export const updateDestination = (destinationId, destinationData) => {
    return axios.put(`${API_URL}/destinations/${destinationId}`, destinationData, getAuthHeader());
};

export const deleteDestination = (destinationId) => {
    return axios.delete(`${API_URL}/destinations/${destinationId}`, getAuthHeader());
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