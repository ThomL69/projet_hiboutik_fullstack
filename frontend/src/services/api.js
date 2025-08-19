import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust the URL as needed

export const fetchClients = async (name, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/clients`, {
            params: { name, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const fetchSalesByClientId = async (clientId, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/sales`, {
            params: { client_id: clientId, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }
};