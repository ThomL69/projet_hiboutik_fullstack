import React, { useEffect, useState } from 'react';

const ClosedSalesPage = () => {
    const token = localStorage.getItem("token");
    const [closedSales, setClosedSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limitData = 5;

    useEffect(() => {
        const getSales = async () => {
            try {
                const response = await fetch(`http://localhost:8000/closed_sales`, {
                    headers: {
                        "Authorization": `Bearer ${token}`, // JWT token
                        "Content-Type": "application/json"
                    }
                });
                
                if (!response.ok) {
                     throw new Error("Error Unauthorized or API error");
                }
                const data = await response.json();
                setClosedSales(data.closed_sales);
                setTotal(data.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getSales();
    }, []);

    const indexOfLastData = page * limitData;
    const indexOfFirstData = indexOfLastData - limitData;
    const totalPages = Math.ceil(total / limitData);
    const currentClosedSales = closedSales.slice(indexOfFirstData , indexOfLastData);

    if (loading) return <div className='txtload'>Loading...</div>;
    if (error) return <div className='txterror'>Error: {error}</div>;

    return (
        <div className="MyPageMC">
            <h3>All Closed Sales:</h3>
            <ul>
                {currentClosedSales.map((closedSale) => (
                <li key={closedSale.id}>
                    Closed Sales #{closedSale.sale_id} - {closedSale.created_at} - {closedSale.completed_at} - total des ventes: {closedSale.total}€
                </li>
                ))}
            </ul>

            <div className="MyPageC">
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

export default ClosedSalesPage;