import React, { useState, useEffect } from 'react';
// import Pagination from '../components/Pagination';
import { useNavigate } from "react-router-dom";

function ClientsPage () {
    const token = localStorage.getItem("token");
    const [name, setName] = useState('');
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(5);
    const navigate = useNavigate();
    
    // Liste des clients
    const searchClients = async () => {
        const response = await fetch(`http://localhost:8000/customers/?name=${name}`, {
            headers: {
                "Authorization": `Bearer ${token}`, // JWT token
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Error Unauthorized or API error");
        }

        const data = await response.json();
        setClients(data.clients);
    };


    // Pagination
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentClients = clients.slice(indexOfFirstData , indexOfLastData);

    const totalPages = Math.ceil(clients.length / 5);

    return (
        <div className="MyPageM" id="ListClients">
            <h3>List of customers</h3>
            <input className="MyInput" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="MyBtn" onClick={searchClients}>Search</button>
            <ul>
            {currentClients.map(client => (
                <li key={client.id} onClick={() => navigate(`sales/${client.customers_id}`)}>
                    {client.customers_id} - {client.last_name} - {client.first_name} - {client.email}
                </li>
            ))}
            </ul>
            {/* <div>
            <Pagination 
                dataPerPage={dataPerPage}
                totalData={clients.length}
                paginate={paginate}
            />
            </div> */}
            <div className="MyPage">
                <button className="MyBtn2" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
                    Previous
                </button>

                <span>
                    {currentPage} / {totalPages || 1}
                </span>

                <button className="MyBtn3"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ClientsPage;