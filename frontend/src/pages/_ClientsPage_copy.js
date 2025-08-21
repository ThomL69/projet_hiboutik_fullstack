import React, { useState, useEffect } from 'react';
import { fetchClients } from '../services/api';
import ClientList from '../components/ClientList';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadClients = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchClients(searchTerm);
                setClients(data);
            } catch (err) {
                setError('Failed to fetch clients');
            } finally {
                setLoading(false);
            }
        };

        loadClients();
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <h1>Clients</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ClientList clients={clients} />
        </div>
    );
};

export default ClientsPage;