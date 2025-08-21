import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SalesList from '../components/SalesList';
import { fetchSalesByClientId } from '../services/api';

const SalesPage = () => {
    const { clientId } = useParams();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSales = async () => {
            try {
                const data = await fetchSalesByClientId(clientId);
                setSales(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getSales();
    }, [clientId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Sales for Client ID: {clientId}</h1>
            <SalesList sales={sales} />
        </div>
    );
};

export default SalesPage;