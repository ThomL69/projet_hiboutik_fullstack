import React, { useEffect, useState } from 'react';
import { fetchSalesByClientId } from '../services/api';

const SalesList = ({ clientId }) => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadSales = async () => {
            setLoading(true);
            try {
                const response = await fetchSalesByClientId(clientId, page);
                setSales(response.data);
                setTotalPages(response.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (clientId) {
            loadSales();
        }
    }, [clientId, page]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Sales List</h2>
            <ul>
                {sales.map(sale => (
                    <li key={sale.id}>
                        Amount: {sale.amount}, Date: {new Date(sale.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default SalesList;