import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchClients = async (pageNumber) => {
        try {
            const response = await axios.get(`/api/clients?page=${pageNumber}`);
            setClients(response.data.clients);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients(page);
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Client List</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>{client.name} - {client.email}</li>
                ))}
            </ul>
            <div>
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ClientList;