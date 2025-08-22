import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SalesPage = () => {
    const token = localStorage.getItem("token");
    const { clientId } = useParams();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limitData = 5;

    useEffect(() => {
        const getSales = async () => {
            try {
                const response = await fetch(`http://localhost:8000/customer/${clientId}/sales?page=${page}&limit=${limitData}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`, // JWT token
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                     throw new Error("Error Unauthorized or API error");
                }
                const data = await response.json();
                setSales(data.ventes);
                setTotal(data.total);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getSales();
    }, [clientId, page]);

    const totalPages = Math.ceil(total / limitData);

    if (loading) return <div className='txtload'>Loading...</div>;
    if (error) return <div className='txterror'>Error: {error}</div>;
    
    return (
        <div className="MyPageM">
            <h3>Sales for Client ID #{clientId}:</h3>
            <ul>
                {sales.map((sale) => (
                <li key={sale.id}>
                    Sale #{sale.sale_id} - {sale.created_at} - {sale.completed_at} - total des ventes: {sale.total}€
                </li>
                ))}
            </ul>

            <div className="MyPage">
                <button className="MyBtn2" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                    Previous
                </button>

                <span>
                    {page} / {totalPages || 1}
                </span>

                <button className="MyBtn3"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SalesPage;