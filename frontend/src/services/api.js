import axios from 'axios';
const axiosRequest = require("axios");

const API_URL = 'http://localhost:8000'; // Adjust the URL as needed

// Liste des clients sauf si nom renseigner
export const fetchClients = async (nom) => {
    try {
        // const response = await axios.get(`${API_URL}/clients/?nom=${nom}`);
        const response = await axios.get(`${API_URL}/clients/?nom=${nom}`, {
            params: { nom: nom }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const fetchSalesByClientId = async (clientId, page = 1, limit = 5) => {
    try {
        // const txt = clientId;
        // const response = await axios.get(`${API_URL}/clients/${txt}/ventes`, {
        const response = await axios.get(`${API_URL}/ventes`, {
            params: { id_client: clientId, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }
};

export const fetchSalesClosed = async (salesId, page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/ventes_cloturees`, {
            params: {salesId, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching closed sales:', error);
        throw error;
    }
};